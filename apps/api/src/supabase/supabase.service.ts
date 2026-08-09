import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Provides the Supabase client (service-role for server-side operations).
 * RLS is enforced by Supabase; service-role bypasses RLS for trusted server calls.
 */
@Injectable()
export class SupabaseService implements OnModuleInit {
  private client!: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('SUPABASE_URL');
    const serviceKey = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !serviceKey) {
      this.logger.warn(
        'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — Supabase disabled. ' +
          'Set them in apps/api/.env (see .env.example).',
      );
      // Create a stub client that throws on use, so the app still boots.
      this.client = createClient(url ?? 'http://localhost:54321', serviceKey ?? '');
      return;
    }

    this.client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    this.logger.log('Supabase connected');
  }

  get supabase(): SupabaseClient {
    if (!this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY')) {
      throw new Error('Supabase is not configured. Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.');
    }
    return this.client;
  }

  /** True when Supabase is configured. */
  get isConfigured(): boolean {
    return !!this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
  }
}