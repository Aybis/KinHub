import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateRecurringItemDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  providerKey?: string;

  @IsEnum(['subscription', 'bill', 'insurance'])
  category!: 'subscription' | 'bill' | 'insurance';

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsEnum(['monthly', 'quarterly', 'yearly'])
  cycle!: 'monthly' | 'quarterly' | 'yearly';

  @IsNumber()
  billingDay!: number;

  @IsOptional()
  @IsDateString()
  nextDue?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}