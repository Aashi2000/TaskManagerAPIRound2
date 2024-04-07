// src/teams/team.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { TasksModule } from '../tasks/tasks.module';
import { UserRepository } from '../auth/user.repository';
import { TaskRepository } from 'src/tasks/task.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository, UserRepository, TaskRepository]),
    TasksModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
