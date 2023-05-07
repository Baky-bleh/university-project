import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUniversityDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}