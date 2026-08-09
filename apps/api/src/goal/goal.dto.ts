import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  name!: string;

  @IsNumber()
  targetAmount!: number;

  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class ContributeDto {
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  note?: string;
}