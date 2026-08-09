import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRecurringItemDto } from './recurring.dto';

@Injectable()
export class RecurringService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(familyId: string, dto: CreateRecurringItemDto) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('recurring_items')
      .insert({
        family_id: familyId,
        name: dto.name,
        provider_key: dto.providerKey,
        category: dto.category,
        amount: dto.amount,
        currency: dto.currency ?? 'IDR',
        cycle: dto.cycle,
        billing_day: dto.billingDay,
        next_due: dto.nextDue ?? new Date().toISOString().slice(0, 10),
        logo_url: dto.logoUrl,
        source: 'catalog',
      })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async list(familyId: string) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('recurring_items')
      .select('*')
      .eq('family_id', familyId)
      .order('next_due', { ascending: true });
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, patch: Partial<CreateRecurringItemDto>) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('recurring_items')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async remove(id: string) {
    const sb = this.supabaseService.supabase;
    const { error } = await sb.from('recurring_items').delete().eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }
}