import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './university.entity';
import { CreateUniversityDto } from './dtos/create-university.dto';
import { UpdateUniversityDto } from './dtos/update-university.dto';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async create(createUniversityDto: CreateUniversityDto): Promise<University> {
    const newUniversity = this.universityRepository.create(createUniversityDto);
    return await this.universityRepository.save(newUniversity);
  }

  async findAll(): Promise<University[]> {
    return await this.universityRepository.find();
  }

  async findOne(id: number): Promise<University> {
    return await this.universityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University> {
    await this.universityRepository.update(id, updateUniversityDto);
    return await this.universityRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.universityRepository.delete(id);
  }
}