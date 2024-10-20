import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const foundUser = await this.userService.findByEmail(createUserDto.email);

    if (foundUser) {
      throw new ConflictException('Email is already in use');
    }

    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.userService.createUser(newUser);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const foundUser = await this.userService.findByEmail(loginDto.email);

    if (!foundUser) {
      throw new NotFoundException(
        'The user with such email has not been found',
      );
    }

    return this.authService.loginJwt(foundUser, loginDto.password);
  }
}
