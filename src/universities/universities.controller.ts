import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUniversityDto } from './dtos/create-university.dto';
import { UpdateUniversityDto } from './dtos/update-university.dto';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  async create(@Body() createUniversityDto: CreateUniversityDto) {
    return await this.universitiesService.create(createUniversityDto);
  }

  @Get()
  async findAll() {
    return await this.universitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.universitiesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUniversityDto: UpdateUniversityDto) {
    return await this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.universitiesService.delete(id);
  }
}