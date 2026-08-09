import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { categorizeTransaction, DEFAULT_CATEGORIZATION_PROVIDER } from '@maya/ai';
import { CreateTransactionDto, CategorizeDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(familyId: string, memberId: string, dto: CreateTransactionDto) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('transactions')
      .insert({
        family_id: familyId,
        member_id: memberId,
        type: dto.type,
        amount: dto.amount,
        currency: dto.currency ?? 'IDR',
        date: dto.date ?? new Date().toISOString().slice(0, 10),
        category: dto.category ?? 'other',
        vendor: dto.vendor,
        merchant_group: dto.merchantGroup,
        note: dto.note,
      })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async list(familyId: string, limit = 50) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('transactions')
      .select('*')
      .eq('family_id', familyId)
      .order('date', { ascending: false })
      .limit(limit);
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, patch: Partial<CreateTransactionDto>) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('transactions')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async remove(id: string) {
    const sb = this.supabaseService.supabase;
    const { error } = await sb.from('transactions').delete().eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }

  /** AI categorize a transaction by vendor + amount. */
  async categorize(dto: CategorizeDto) {
    return categorizeTransaction(
      DEFAULT_CATEGORIZATION_PROVIDER,
      dto.vendor,
      dto.amount,
    );
  }
}