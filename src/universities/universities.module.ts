import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  providers: [UniversitiesService],
  controllers: [UniversitiesController],
  exports: [UniversitiesService], // Add this line to export UniversitiesService
})
export class UniversitiesModule {}