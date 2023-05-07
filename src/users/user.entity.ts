import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Score } from './score.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];
}