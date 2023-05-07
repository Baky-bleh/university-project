import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UniversitiesService } from '../universities/universities.service';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { UpdateUniversityDto } from '../universities/dtos/update-university.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly universitiesService: UniversitiesService,
  ) {}

  async changeUserPassword(id: number, newPassword: string): Promise<void> {
    const updateUserDto: UpdateUserDto = { password: newPassword };
    await this.usersService.update(id, updateUserDto);
  }

  async changeUniversityPassword(id: number, newPassword: string): Promise<void> {
    const updateUniversityDto: UpdateUniversityDto = { password: newPassword };
    await this.universitiesService.update(id, updateUniversityDto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersService.delete(id);
  }

  async deleteUniversity(id: number): Promise<void> {
    await this.universitiesService.delete(id);
  }
}