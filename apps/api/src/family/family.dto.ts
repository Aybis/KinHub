import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class InviteMemberDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  name!: string;

  @IsEnum(['parent', 'teen', 'child'])
  role!: 'parent' | 'teen' | 'child';

  @IsOptional()
  @IsEnum(['full', 'learning'])
  lens?: 'full' | 'learning';
}

export class UpdateMemberDto {
  @IsOptional()
  @IsEnum(['parent', 'teen', 'child'])
  role?: 'parent' | 'teen' | 'child';

  @IsOptional()
  @IsEnum(['full', 'learning'])
  lens?: 'full' | 'learning';

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['invited', 'verified', 'active', 'removed'])
  status?: 'invited' | 'verified' | 'active' | 'removed';
}