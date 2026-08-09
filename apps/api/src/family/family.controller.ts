import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto, InviteMemberDto, UpdateMemberDto } from './family.dto';

@Controller('api/v1/families')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  create(@Body() dto: CreateFamilyDto) {
    // In production, resolve auth user id + name from JWT.
    return this.familyService.createFamily('AUTH_USER_PENDING', 'Owner', dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.familyService.getFamily(id);
  }

  @Post(':id/members')
  invite(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.familyService.inviteMember(id, dto);
  }

  @Get(':id/members')
  members(@Param('id') id: string) {
    return this.familyService.listMembers(id);
  }

  @Patch('members/:memberId')
  updateMember(@Param('memberId') memberId: string, @Body() dto: UpdateMemberDto) {
    return this.familyService.updateMember(memberId, dto);
  }

  @Delete('members/:memberId')
  removeMember(@Param('memberId') memberId: string) {
    return this.familyService.removeMember(memberId);
  }
}