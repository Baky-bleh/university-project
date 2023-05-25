import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (user && await argon2.verify(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    
    console.log(await argon2.verify(user.password, pass));
    return null;
  }

  async login(user: any) {
    const tokens = await this.getTokens({
      username: user.username,
      id: user.id,
      role: user.role,
    });
    await this.updateRefreshToken(user.id, tokens.refresh_token); // Ensure user.id is not undefined
    return tokens;
  }

  async apiToken(user: any) {
    return {
      access_token: this.jwtService.sign(
          {
          username: user.username,
          id: user.id,
          role: user.role,
          enterpriseId: user.enterpriseId
        }, {
          secret: this.configService.get('ACCESS_TOKEN_KEY'),
          expiresIn: '43200s'
      })
    };
  }

  async logout(userId: number) {
    return await this.usersService.updateUser({
      id: userId,
      refreshToken: null
    });
  }

  async getTokens(userInfo){
    return {
      access_token: this.jwtService.sign(userInfo,{
        secret: this.configService.get('ACCESS_TOKEN_KEY'),
        expiresIn: '3600s'
      }),
      expire_at: Date.now() + 3550000,
      refresh_token: this.jwtService.sign(userInfo,{
        secret: this.configService.get('REFRESH_TOKEN_KEY'),
        expiresIn: '3d'
      }),
      current_user: userInfo
    }
  }

  async updateRefreshToken(userId, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateUser({
      id: userId,
      refreshToken: hashedRefreshToken
    });
  }

  

}