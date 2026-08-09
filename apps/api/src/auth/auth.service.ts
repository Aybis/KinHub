import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { SupabaseService } from '../supabase/supabase.service';
import { OtpRequestDto, OtpVerifyDto } from './auth.dto';

/**
 * Auth via Supabase Auth (OTP magic-link / phone) + family member linking.
 */
@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Request an OTP for a family member by email or phone.
   * Uses Supabase Auth OTP (signInWithOtp).
   */
  async requestOtp(dto: OtpRequestDto) {
    const sb = this.supabaseService.supabase;
    if (dto.email) {
      const { error } = await sb.auth.signInWithOtp({ email: dto.email });
      if (error) throw new BadRequestException(error.message);
      return { message: 'OTP sent to email', channel: 'email' };
    }
    if (dto.phone) {
      const { error } = await sb.auth.signInWithOtp({ phone: dto.phone });
      if (error) throw new BadRequestException(error.message);
      return { message: 'OTP sent to phone', channel: 'phone' };
    }
    throw new BadRequestException('Provide email or phone');
  }

  /**
   * Verify OTP, obtain a Supabase session, and resolve the family member.
   */
  async verifyOtp(dto: OtpVerifyDto) {
    const sb = this.supabaseService.supabase;
    let session;

    if (dto.email) {
      const { data, error } = await sb.auth.verifyOtp({
        email: dto.email,
        token: dto.code,
        type: 'email',
      });
      if (error) throw new UnauthorizedException(error.message);
      session = data.session;
    } else if (dto.phone) {
      const { data, error } = await sb.auth.verifyOtp({
        phone: dto.phone,
        token: dto.code,
        type: 'sms',
      });
      if (error) throw new UnauthorizedException(error.message);
      session = data.session;
    } else {
      throw new BadRequestException('Provide email or phone');
    }

    if (!session) throw new UnauthorizedException('No session returned');

    // Look up the member row for this auth user
    const userId = session.user.id;
    const { data: member } = await sb
      .from('members')
      .select('*')
      .eq('auth_id', userId)
      .maybeSingle();

    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      user: session.user,
      member,
    };
  }

  /**
   * Generate a local OTP code hash (for scenarios outside Supabase Auth).
   */
  hashOtp(code: string): string {
    return createHash('sha256').update(code).digest('hex');
  }

  generateOtp(): string {
    return randomBytes(3).toString('hex').toUpperCase(); // 6 hex chars
  }
}