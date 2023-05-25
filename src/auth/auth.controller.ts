import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() res) { // replace @Request() req with @Body() body
      return res.user;
  }


  
  @Post('apiToken')
  async apiToken(@Request() req) {
      return this.authService.apiToken(req.user);
  }



  
  @Post('logout')
  async logout(@Request() req) {
      return this.authService.logout(req.user.id);
  }

}