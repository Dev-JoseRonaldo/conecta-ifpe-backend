import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';

export enum UserRole {
  ALUNO = 'aluno',
  ASSISTENTE_SOCIAL = 'assistente_social',
  FINANCEIRO = 'financeiro',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  siape?: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  campus: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  birthDate: string;
}
