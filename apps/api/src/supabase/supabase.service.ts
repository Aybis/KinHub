import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Provides the Supabase client (service-role for server-side operations).
 * RLS is enforced by Supabase; service-role bypasses RLS for trusted server calls.
 *
 * Reads config from process.env (loaded by ConfigModule's dotenv) to avoid
 * DI ordering issues with @Global modules.
 */
@Injectable()
export class SupabaseService implements OnModuleInit {
  private client!: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  onModuleInit() {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      this.logger.warn(
        'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — Supabase disabled. ' +
          'Set them in apps/api/.env (see .env.example).',
      );
      // Leave client unset; supabase getter throws if used. App still boots.
      return;
    }

    this.client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    this.logger.log('Supabase connected');
  }

  get supabase(): SupabaseClient {
    if (!this.client) {
      throw new Error('Supabase is not configured. Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.');
    }
    return this.client;
  }

  /** True when Supabase is configured. */
  get isConfigured(): boolean {
    return !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
}