import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UniversitiesModule } from './universities/universities.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { User } from './users/user.entity';
import { University } from './universities/university.entity';
import { Subject } from './users/subject.entity'; // Add this import
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    UniversitiesModule,
    AuthModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Dioda123',
      database: 'project1',
      entities: [User, University, Subject],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}