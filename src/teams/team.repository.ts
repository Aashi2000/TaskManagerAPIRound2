// src/teams/team.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {}
