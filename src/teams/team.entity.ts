// teams/team.entity.ts

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Define the relationship with User entity
  @OneToMany(() => User, user => user.team)
  members: User[];
}
