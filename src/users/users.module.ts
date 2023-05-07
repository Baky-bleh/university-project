// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subject])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Add this line to export UsersService
})
export class UsersModule {}