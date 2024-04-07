// auth/user.entity.ts

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Team } from '../teams/team.entity'; // Import the Team entity
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  // Define the relationship with Task entity
  @OneToMany(
    () => Task,
    task => task.user,
  )
  tasks: Task[];

  // Define the relationship with Team entity
  @ManyToOne(
    () => Team,
    team => team.members,
  )
  team: Team;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

export default User;
