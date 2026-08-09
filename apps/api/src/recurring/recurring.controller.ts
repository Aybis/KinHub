import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { RecurringService } from './recurring.service';
import { CreateRecurringItemDto } from './recurring.dto';

@Controller('api/v1/families/:familyId/recurring')
export class RecurringController {
  constructor(private readonly recurringService: RecurringService) {}

  @Post()
  create(@Param('familyId') familyId: string, @Body() dto: CreateRecurringItemDto) {
    return this.recurringService.create(familyId, dto);
  }

  @Get()
  list(@Param('familyId') familyId: string) {
    return this.recurringService.list(familyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateRecurringItemDto>) {
    return this.recurringService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringService.remove(id);
  }
}