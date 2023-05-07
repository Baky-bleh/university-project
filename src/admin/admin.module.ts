import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { UniversitiesModule } from '../universities/universities.module';

@Module({
  imports: [UsersModule, UniversitiesModule], // Make sure UniversitiesModule is imported here
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}