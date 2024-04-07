import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './teams/team.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, TasksModule, TeamModule],
})
export class AppModule {}
