import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
        role: UserRole.CONVIDADO,
        desiredRole: createUserDto.desiredRole,
        siape: createUserDto.siape || null,
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        campus: createUserDto.campus,
        phone: createUserDto.phone,
        birthDate: new Date(createUserDto.birthDate),
        cpf: createUserDto.cpf,
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

  async findAllByRole(role: UserRole): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role },
    });
  }

  async updateMany(updateUsersDto: UpdateUserDto[]): Promise<User[]> {
    const updatedUsers: User[] = [];

    for (const userDto of updateUsersDto) {
      const updatedUser = await this.prisma.user.update({
        where: { id: userDto.id },
        data: {
          username: userDto.username,
          password: userDto.password,
          role: userDto.desiredRole,
          desiredRole: userDto.desiredRole,
          siape: userDto.siape || null,
          fullName: userDto.fullName,
          email: userDto.email,
          campus: userDto.campus,
          phone: userDto.phone,
          birthDate: userDto.birthDate
            ? new Date(userDto.birthDate)
            : undefined,
          cpf: userDto.cpf,
        },
      });
      updatedUsers.push(updatedUser);
    }

    return updatedUsers;
  }
}
