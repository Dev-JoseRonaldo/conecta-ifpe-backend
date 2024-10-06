import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client'; // Importando a definição de User do Prisma

@Injectable()
export class AuthService {
  private tokenBlacklist = new Set<string>(); // Blacklist de tokens

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Adicionar token à blacklist
  async addToBlacklist(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
  }

  // Verificar se o token está na blacklist
  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
}
