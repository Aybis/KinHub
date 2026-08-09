import { IsBase64, IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';

export class ScanExtractDto {
  @IsBase64()
  fileBase64!: string;

  @IsEnum(['image/jpeg', 'image/png', 'application/pdf'])
  mimeType!: 'image/jpeg' | 'image/png' | 'application/pdf';

  @IsOptional()
  @IsString()
  defaultCurrency?: string;
}

export class ScanConfirmDto {
  @IsString()
  vendor!: string;

  @IsOptional()
  @IsString()
  merchantGroup?: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  date?: string;

  /** Any line items to also create as inventory (Buy → Have). */
  @IsOptional()
  lineItems?: Array<{
    description: string;
    amount: number;
    type: 'expense' | 'refund';
  }>;
}