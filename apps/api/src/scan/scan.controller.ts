import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanExtractDto, ScanConfirmDto } from './scan.dto';
import { AIExtraction } from '@maya/shared';

@Controller('api/v1/scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  /** Upload → Scan → Preview */
  @Post('extract')
  @HttpCode(200)
  async extract(@Body() dto: ScanExtractDto): Promise<AIExtraction> {
    try {
      return await this.scanService.extract(dto);
    } catch (err) {
      throw new HttpException(
        err instanceof Error ? err.message : 'Extraction failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** Confirm → cascade writes (Spend + Have + Leak) */
  @Post('confirm')
  @HttpCode(201)
  confirm(@Body() dto: ScanConfirmDto) {
    return this.scanService.confirm(dto);
  }
}