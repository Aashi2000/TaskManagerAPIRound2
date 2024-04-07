// src/teams/team.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('teams')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiOkResponse({ description: 'Team Created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @ApiOkResponse({ description: 'Get team by ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get(':id')
  async getTeamById(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamService.getTeamById(id);
  }

  @ApiOkResponse({ description: 'Get all teams' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.getAllTeams();
  }

  @ApiOkResponse({ description: 'Delete team with team' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Delete(':id')
  async deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teamService.deleteTeam(id);
  }

  @ApiOkResponse({ description: 'add team Members by ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized team member' })
  @Post(':teamId/members')
  async addTeamMembers(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() memberIds: any,
  ): Promise<void> {
    //console.log('mmmmmmmmmmmm', memberIds.memberIds);
    await this.teamService.addTeamMembers(teamId, memberIds.memberIds);
  }

  @ApiOkResponse({ description: 'assign tasks to team Members' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized team member' })
  @Post(':teamId/tasks/:taskId/assign')
  async assignTaskToTeamMembers(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() assignees: number[],
  ): Promise<void> {
    await this.teamService.assignTaskToTeamMembers(teamId, taskId, assignees);
  }

  @ApiOkResponse({ description: 'delete team Members using userid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized team member' })
  @Delete(':teamId/members/:userId')
  async removeTeamMember(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.teamService.removeTeamMember(teamId, userId);
  }
}
