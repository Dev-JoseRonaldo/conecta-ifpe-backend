import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService, // Injetando AuthService para lidar com a blacklist
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req: any,
  ): Promise<User> {
    const currentUser = req.user;

    if (
      createUserDto.role === UserRole.ADMIN &&
      currentUser.role !== UserRole.ADMIN
    ) {
      throw new HttpException(
        'Apenas administradores podem criar usuários com cargo de admin.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any): Promise<{ message: string }> {
    const token = req.headers.authorization.split(' ')[1];
    await this.authService.addToBlacklist(token);
    return { message: 'Logout realizado com sucesso' };
  }
}
