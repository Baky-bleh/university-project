import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { University } from './university.entity';

@Entity()
export class StudentExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => University, (university) => university.studentExperiences)
  university: University;
}