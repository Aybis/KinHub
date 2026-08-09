import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateFamilyDto, InviteMemberDto, UpdateMemberDto } from './family.dto';

@Injectable()
export class FamilyService {
  constructor(private readonly supabaseService: SupabaseService) {}

  /** Create a family and the owner member row. */
  async createFamily(authUserId: string, ownerName: string, dto: CreateFamilyDto) {
    const sb = this.supabaseService.supabase;

    const { data: family, error: famErr } = await sb
      .from('families')
      .insert({ name: dto.name, currency: dto.currency ?? 'IDR' })
      .select()
      .single();
    if (famErr) throw new BadRequestException(famErr.message);

    const { data: member, error: memErr } = await sb
      .from('members')
      .insert({
        family_id: family.id,
        auth_id: authUserId,
        role: 'parent',
        lens: 'full',
        name: ownerName,
        is_owner: true,
        status: 'active',
      })
      .select()
      .single();
    if (memErr) throw new BadRequestException(memErr.message);

    return { family, member };
  }

  /** Get a family by id. */
  async getFamily(familyId: string) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb.from('families').select('*').eq('id', familyId).single();
    if (error) throw new NotFoundException(error.message);
    return data;
  }

  /** Invite a member (owner only — enforced by RLS). */
  async inviteMember(familyId: string, dto: InviteMemberDto) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('members')
      .insert({
        family_id: familyId,
        role: dto.role,
        lens: dto.lens ?? 'full',
        name: dto.name,
        email: dto.email ?? null,
        phone: dto.phone ?? null,
        status: 'invited',
      })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  /** List members of a family. */
  async listMembers(familyId: string) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('members')
      .select('*')
      .eq('family_id', familyId)
      .order('created_at');
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  /** Update a member (owner or self). */
  async updateMember(memberId: string, dto: UpdateMemberDto) {
    const sb = this.supabaseService.supabase;
    const patch = {
      ...(dto.role ? { role: dto.role } : {}),
      ...(dto.lens ? { lens: dto.lens } : {}),
      ...(dto.name ? { name: dto.name } : {}),
      ...(dto.status ? { status: dto.status } : {}),
    };
    const { data, error } = await sb
      .from('members')
      .update(patch)
      .eq('id', memberId)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  /** Remove a member. */
  async removeMember(memberId: string) {
    const sb = this.supabaseService.supabase;
    const { error } = await sb.from('members').delete().eq('id', memberId);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }
}