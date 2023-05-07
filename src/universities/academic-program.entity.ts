import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { University } from './university.entity';

@Entity()
export class AcademicProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => University, (university) => university.academicPrograms)
  university: University;
}