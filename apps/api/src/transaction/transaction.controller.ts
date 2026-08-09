import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, CategorizeDto } from './transaction.dto';

@Controller('api/v1/families/:familyId/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Param('familyId') familyId: string, @Body() dto: CreateTransactionDto) {
    return this.transactionService.create(familyId, 'MEMBER_ID_PENDING', dto);
  }

  @Get()
  list(@Param('familyId') familyId: string, @Query('limit') limit?: string) {
    return this.transactionService.list(familyId, limit ? Number(limit) : 50);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateTransactionDto>) {
    return this.transactionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }

  @Post('categorize')
  categorize(@Body() dto: CategorizeDto) {
    return this.transactionService.categorize(dto);
  }
}