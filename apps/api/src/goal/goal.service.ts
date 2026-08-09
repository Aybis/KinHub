import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateGoalDto, ContributeDto } from './goal.dto';

@Injectable()
export class GoalService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(familyId: string, memberId: string, dto: CreateGoalDto) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('goals')
      .insert({
        family_id: familyId,
        name: dto.name,
        target_amount: dto.targetAmount,
        target_date: dto.targetDate,
        category: dto.category,
        created_by: memberId,
      })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async list(familyId: string) {
    const sb = this.supabaseService.supabase;
    const { data, error } = await sb
      .from('goals')
      .select('*')
      .eq('family_id', familyId)
      .order('created_at', { ascending: false });
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async contribute(goalId: string, memberId: string, contribution: ContributeDto) {
    const sb = this.supabaseService.supabase;
    const { data: goal, error: goalErr } = await sb
      .from('goals')
      .select('*')
      .eq('id', goalId)
      .single();
    if (goalErr) throw new BadRequestException(goalErr.message);

    const { error: contribErr } = await sb.from('goal_contributions').insert({
      goal_id: goalId,
      member_id: memberId,
      amount: contribution.amount,
      note: contribution.note,
    });
    if (contribErr) throw new BadRequestException(contribErr.message);

    // Update goal current_amount
    const newAmount = Number(goal.current_amount) + contribution.amount;
    const { data: updated, error: updErr } = await sb
      .from('goals')
      .update({ current_amount: newAmount })
      .eq('id', goalId)
      .select()
      .single();
    if (updErr) throw new BadRequestException(updErr.message);
    return updated;
  }

  async remove(goalId: string) {
    const sb = this.supabaseService.supabase;
    const { error } = await sb.from('goals').delete().eq('id', goalId);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }
}