// src/teams/dto/create-team.dto.ts

import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;
}
