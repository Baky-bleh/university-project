import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;
}