import { IsString, IsEnum } from 'class-validator';

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
}
