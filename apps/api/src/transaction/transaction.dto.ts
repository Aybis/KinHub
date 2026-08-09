import { IsNumber, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(['expense', 'income', 'refund', 'transfer'])
  type!: 'expense' | 'income' | 'refund' | 'transfer';

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  vendor!: string;

  @IsOptional()
  @IsString()
  merchantGroup?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

export class CategorizeDto {
  @IsString()
  vendor!: string;

  @IsNumber()
  amount!: number;
}