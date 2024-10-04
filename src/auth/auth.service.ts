/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  private tokenBlacklist = new Set<string>(); // Blacklist de tokens

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user; // Não retornar a senha
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
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
