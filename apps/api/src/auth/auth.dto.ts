import { IsEmail, IsOptional, IsString } from 'class-validator';

export class OtpRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class OtpVerifyDto {
  @IsString()
  code!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}