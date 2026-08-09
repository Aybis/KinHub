import type { AIProviderConfig } from './client';

/**
 * Default provider registry.
 *
 * These are examples wired to env vars. In production, providers are
 * configurable per tenant / per task through the admin console or env.
 * Custom OpenAI-compatible endpoints are supported via `provider: 'custom'`.
 */
export const DEFAULT_PROVIDERS: Record<string, AIProviderConfig> = {
  shiteru: {
    provider: 'shiteru',
    baseUrl: 'https://shiteru.id/v1',
    keyEnv: 'HERMES_CUSTOM_SHITERU_API_KEY',
    model: 'deepseek-v4-pro',
  },
  surplus: {
    provider: 'surplus',
    baseUrl: 'https://api.surplusintelligence.ai/v1/',
    apiKey: process.env.SURPLUS_API_KEY,
    model: 'deepseek-v4-flash',
  },
};

/**
 * Default vision/extraction task config with a fallback chain:
 * shiteru (deepseek-v4-pro) → surplus (deepseek-v4-flash).
 */
export const DEFAULT_VISION_PROVIDER: AIProviderConfig = {
  ...DEFAULT_PROVIDERS.shiteru,
  model: 'deepseek-v4-pro',
  fallbacks: [DEFAULT_PROVIDERS.surplus],
};

/**
 * Default categorization task config.
 */
export const DEFAULT_CATEGORIZATION_PROVIDER: AIProviderConfig = {
  ...DEFAULT_PROVIDERS.shiteru,
  model: 'deepseek-v4-flash',
  fallbacks: [DEFAULT_PROVIDERS.surplus],
};

/**
 * Merges a tenant-provided override onto a default config.
 * Allows per-tenant custom providers while keeping sane defaults.
 */
export function mergeProvider(
  base: AIProviderConfig,
  override?: Partial<AIProviderConfig>,
): AIProviderConfig {
  return {
    ...base,
    ...override,
    fallbacks: override?.fallbacks ?? base.fallbacks,
  };
}