import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './inventory.dto';

@Controller('api/v1/families/:familyId/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Param('familyId') familyId: string, @Body() dto: CreateInventoryItemDto) {
    return this.inventoryService.create(familyId, dto);
  }

  @Get()
  list(@Param('familyId') familyId: string) {
    return this.inventoryService.list(familyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateInventoryItemDto>) {
    return this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}