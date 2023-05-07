import { Controller, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../auth/roles.decorator';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Roles('admin')
  @Put('users/:id/password')
  async changeUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.adminService.changeUserPassword(id, newPassword);
  }
  @Roles('admin')
  @Put('universities/:id/password')
  async changeUniversityPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.adminService.changeUniversityPassword(id, newPassword);
  }
  @Roles('admin')
  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteUser(id);
  }
  @Roles('admin')
  @Delete('universities/:id')
  async deleteUniversity(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteUniversity(id);
  }
}