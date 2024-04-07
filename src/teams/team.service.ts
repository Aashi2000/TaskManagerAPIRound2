// src/teams/team.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { UserRepository } from '../auth/user.repository'; // Import UserRepository
import { TaskRepository } from '../tasks/task.repository'; // Import TaskRepository

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @InjectRepository(UserRepository) // Inject UserRepository
    private readonly userRepository: UserRepository,
    @InjectRepository(TaskRepository) // Inject TaskRepository
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name } = createTeamDto;
    const team = this.teamRepository.create({ name });
    await this.teamRepository.save(team);
    return team;
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  async addTeamMembers(teamId: number, memberIds: number[]): Promise<void> {
    const team = await this.teamRepository.findOne(teamId, {
      relations: ['members'],
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const members = await this.userRepository.findByIds(memberIds);
    if (members.length !== memberIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    console.log('ttttttttttt', team);
    team.members = [...team.members, ...members];
    await this.teamRepository.save(team);
  }

  async assignTaskToTeamMembers(
    teamId: number,
    taskId: number,
    assignees: number[],
  ): Promise<void> {
    const team = await this.teamRepository.findOne(teamId, {
      relations: ['members'],
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const users = await this.userRepository.findByIds(assignees);
    if (users.length !== assignees.length) {
      throw new NotFoundException('One or more users not found');
    }

    task.assignees = [...task.assignees, ...users];
    await this.taskRepository.save(task);
  }

  async removeTeamMember(teamId: number, userId: number): Promise<void> {
    const team = await this.teamRepository.findOne(teamId, {
      relations: ['members'],
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const userIndex = team.members.findIndex(member => member.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException(
        `User with ID ${userId} is not a member of the team`,
      );
    }

    team.members.splice(userIndex, 1);
    await this.teamRepository.save(team);
  }
}
