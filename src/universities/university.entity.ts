import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AcademicProgram } from './academic-program.entity';
import { StudentExperience } from './student-experience.entity';


@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column()
  description: string;

  @Column()
  additionalInformation: string;

  @Column()
  url: string;

  @OneToMany(
    () => AcademicProgram,
    (academicProgram) => academicProgram['university'], // Use a string instead of a function
  )
  academicPrograms: AcademicProgram[];

  @OneToMany(
    () => StudentExperience,
    (studentExperience) => studentExperience['university'], // Use a string instead of a function
  )
  studentExperiences: StudentExperience[];
}