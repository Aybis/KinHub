import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateInventoryItemDto } from './inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(familyId: string, dto: CreateInventoryItemDto) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('inventory_items')
      .insert({
        family_id: familyId,
        name: dto.name,
        category: dto.category ?? 'other',
        room: dto.room,
        value: dto.value,
        purchase_date: dto.purchaseDate,
        purchase_price: dto.purchasePrice,
        warranty_expiry: dto.warrantyExpiry,
        serial_number: dto.serialNumber,
      })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async list(familyId: string) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('inventory_items')
      .select('*')
      .eq('family_id', familyId)
      .order('created_at', { ascending: false });
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, patch: Partial<CreateInventoryItemDto>) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('inventory_items')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async remove(id: string) {
    const sb = this.supabaseService.supabase;
    const { error } = await sb.from('inventory_items').delete().eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }
}