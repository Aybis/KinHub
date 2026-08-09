import OpenAI from 'openai';
import { z } from 'zod';
import { AIExtractionSchema, type AIExtraction } from '@maya/shared';

/* ------------------------------------------------------------------ */
/*  AI Provider configuration — custom provider support                 */
/*  Any OpenAI-compatible endpoint works. No vendor lock-in.            */
/* ------------------------------------------------------------------ */

export interface AIProviderConfig {
  /** Provider name (e.g. 'custom', 'shiteru', 'surplus'). */
  provider: string;
  /** OpenAI-compatible base URL. */
  baseUrl: string;
  /** API key. Prefer env var name via keyEnv for security. */
  apiKey?: string;
  /** Env var name containing the API key. */
  keyEnv?: string;
  /** Model name for this task. */
  model: string;
  /** Ordered fallback providers tried on rate-limit/5xx/connection errors. */
  fallbacks?: AIProviderConfig[];
  /** Optional per-request extra body (e.g. reasoning_effort). */
  extraBody?: Record<string, unknown>;
  /** Skip TLS verification (dev only). */
  allowInsecure?: boolean;
}

export interface AIProviderResolver {
  /** Resolve the effective provider config for a task, honoring fallbacks. */
  resolve(task: string): AIProviderConfig;
}

/**
 * Resolves an API key from an inline value or an env var name.
 */
export function resolveApiKey(config: AIProviderConfig): string {
  if (config.apiKey) return config.apiKey;
  if (config.keyEnv) {
    const fromEnv = process.env[config.keyEnv];
    if (fromEnv) return fromEnv;
  }
  throw new Error(
    `No API key for AI provider "${config.provider}". Set \`apiKey\` or \`keyEnv\` (env var: ${config.keyEnv ?? 'none'}).`,
  );
}

/**
 * Builds an OpenAI client for a provider config.
 */
export function createClient(config: AIProviderConfig): OpenAI {
  return new OpenAI({
    apiKey: resolveApiKey(config),
    baseURL: config.baseUrl,
    ...(config.allowInsecure ? { dangerouslyAllowBrowser: false } : {}),
  });
}

/**
 * Attempts a call across the provider chain (primary + fallbacks).
 * Tries each provider in order; on error, moves to the next fallback.
 */
export async function withFallbacks<T>(
  config: AIProviderConfig,
  fn: (client: OpenAI, cfg: AIProviderConfig) => Promise<T>,
): Promise<T> {
  const chain = [config, ...(config.fallbacks ?? [])];
  let lastError: unknown;

  for (const cfg of chain) {
    try {
      return await fn(createClient(cfg), cfg);
    } catch (err) {
      lastError = err;
      // eslint-disable-next-line no-console
      console.warn(
        `[maya/ai] provider "${cfg.provider}" (${cfg.model}) failed: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error('All AI providers failed');
}

/* ------------------------------------------------------------------ */
/*  Receipt / Invoice extraction                                        */
/* ------------------------------------------------------------------ */

const EXTRACTION_SYSTEM_PROMPT = `You are a financial document extraction engine for a family finance app.
Extract structured data from the provided receipt or invoice image.
Return ONLY valid JSON matching this schema:
{
  "vendor": string,            // merchant or vendor name
  "merchantGroup": string,     // normalized merchant grouping (optional)
  "date": "YYYY-MM-DD",        // invoice date (optional)
  "currency": "IDR"|"USD"|... , // invoice currency
  "lineItems": [{ "description": string, "amount": number, "type": "expense"|"refund" }],
  "subtotal": number,
  "tax": number,
  "total": number,
  "totalConverted": number,    // optional, converted to default currency
  "category": string,          // e.g. "subscription" | "grocery" | "utility"
  "confidence": number         // 0-1 extraction confidence
}
Negative amounts or discount lines are "refund" type. Do not invent values.`;

/**
 * Extract structured data from an invoice/receipt image or PDF bytes.
 * Uses the configured vision provider (with fallbacks).
 */
export async function extractInvoice(
  config: AIProviderConfig,
  imageBase64: string,
  mimeType: 'image/jpeg' | 'image/png' | 'application/pdf' = 'image/jpeg',
  defaultCurrency: string = 'IDR',
): Promise<AIExtraction> {
  return withFallbacks(config, async (client, cfg) => {
    const completion = await client.chat.completions.create({
      model: cfg.model,
      ...(cfg.extraBody ?? {}),
      messages: [
        { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Extract the financial details. Default currency: ${defaultCurrency}.`,
            },
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${imageBase64}` },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? '';
    const json = extractJson(raw);
    const parsed = AIExtractionSchema.parse(json);
    return parsed;
  });
}

/** Extracts a JSON object from a possibly noisy LLM response. */
function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Strip code fence if present
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (fenced) return JSON.parse(fenced[1]);
    // Fall back to first { ... } block
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error('Could not parse AI extraction output as JSON');
  }
}

/* ------------------------------------------------------------------ */
/*  Photo -> inventory suggestion                                       */
/* ------------------------------------------------------------------ */

const INVENTORY_SUGGESTION_SCHEMA = z.object({
  name: z.string(),
  category: z.string(),
  estimatedValue: z.number().nonnegative(),
  confidence: z.number().min(0).max(1),
});

export interface InventorySuggestion {
  name: string;
  category: string;
  estimatedValue: number;
  confidence: number;
}

/**
 * Identify an item from a photo and estimate its value.
 */
export async function suggestInventoryItem(
  config: AIProviderConfig,
  imageBase64: string,
  mimeType: 'image/jpeg' | 'image/png' = 'image/jpeg',
): Promise<InventorySuggestion> {
  return withFallbacks(config, async (client, cfg) => {
    const completion = await client.chat.completions.create({
      model: cfg.model,
      ...(cfg.extraBody ?? {}),
      messages: [
        {
          role: 'system',
          content:
            'You identify household items from photos and estimate their current value. Return ONLY JSON: {"name": string, "category": string, "estimatedValue": number (in IDR), "confidence": number 0-1}.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Identify this household item and estimate its value in Indonesian Rupiah.',
            },
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${imageBase64}` },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? '';
    const parsed = INVENTORY_SUGGESTION_SCHEMA.parse(extractJson(raw)) as InventorySuggestion;
    return parsed;
  });
}

/* ------------------------------------------------------------------ */
/*  Smart categorization                                                */
/* ------------------------------------------------------------------ */

const CATEGORIZATION_SCHEMA = z.object({
  category: z.string(),
  confidence: z.number().min(0).max(1),
  isRecurring: z.boolean(),
});

export interface CategorizationResult {
  category: string;
  confidence: number;
  isRecurring: boolean;
}

/**
 * Categorize a transaction based on vendor + amount (+ optional history).
 */
export async function categorizeTransaction(
  config: AIProviderConfig,
  vendor: string,
  amount: number,
  historyCategories?: string[],
): Promise<CategorizationResult> {
  return withFallbacks(config, async (client, cfg) => {
    const historyHint = historyCategories?.length
      ? ` Known categories from history: ${historyCategories.join(', ')}.`
      : '';
    const completion = await client.chat.completions.create({
      model: cfg.model,
      ...(cfg.extraBody ?? {}),
      messages: [
        {
          role: 'system',
          content:
            'You categorize personal finance transactions. Return ONLY JSON: {"category": string, "confidence": number 0-1, "isRecurring": boolean}. Example categories: groceries, dining, utilities, subscription, transport, housing, shopping, health, entertainment, education, other.',
        },
        {
          role: 'user',
          content: `Categorize: vendor="${vendor}", amount=${amount}.${historyHint}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? '';
    const parsed = CATEGORIZATION_SCHEMA.parse(extractJson(raw)) as CategorizationResult;
    return parsed;
  });
}