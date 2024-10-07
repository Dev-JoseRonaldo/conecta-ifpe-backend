import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  id: number;
  username?: string;
  password?: string;
  role?: UserRole;
  desiredRole?: UserRole;
  siape?: string;
  fullName?: string;
  email?: string;
  campus?: string;
  phone?: string;
  birthDate?: string;
  cpf?: string;
}
