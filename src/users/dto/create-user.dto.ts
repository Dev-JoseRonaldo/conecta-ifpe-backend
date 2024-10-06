import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';

import { UserRole as PrismaUserRole, UserRole } from '@prisma/client'; // Importando a enum do Prisma

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(PrismaUserRole)
  role: PrismaUserRole;

  @IsEnum(UserRole)
  desiredRole: UserRole;

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

  @IsString()
  cpf: string;
}
