import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto, ContributeDto } from './goal.dto';

@Controller('api/v1/families/:familyId/goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Param('familyId') familyId: string, @Body() dto: CreateGoalDto) {
    return this.goalService.create(familyId, 'MEMBER_ID_PENDING', dto);
  }

  @Get()
  list(@Param('familyId') familyId: string) {
    return this.goalService.list(familyId);
  }

  @Post(':id/contributions')
  contribute(@Param('id') id: string, @Body() dto: ContributeDto) {
    return this.goalService.contribute(id, 'MEMBER_ID_PENDING', dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(id);
  }
}