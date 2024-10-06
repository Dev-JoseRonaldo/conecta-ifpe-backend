import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username, // Utilize o DTO
        password: createUserDto.password, // Utilize o DTO
        role: UserRole.CONVIDADO, // Role padrão ao se cadastrar
        desiredRole: createUserDto.desiredRole, // Usando a role desejada do DTO
        siape: createUserDto.siape, // Utilize o DTO
        fullName: createUserDto.fullName, // Utilize o DTO
        email: createUserDto.email, // Utilize o DTO
        campus: createUserDto.campus, // Utilize o DTO
        phone: createUserDto.phone, // Utilize o DTO
        birthDate: new Date(createUserDto.birthDate), // Utilize o DTO
        cpf: createUserDto.cpf, // Utilize o DTO
      },
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
