import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
  NotFoundException,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtRefreshAuthGuard } from 'src/auth/guards/jwt-refresh-auth.guard';
import { User } from '@prisma/client';

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
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const foundUser = await this.userService.findByEmail(loginDto.email);

    if (!foundUser) {
      throw new NotFoundException(
        'The user with such email has not been found',
      );
    }

    return this.authService.loginJwt(foundUser, loginDto.password, response);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh_token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const foundUser = req.user;

    return this.authService.refreshTokens(foundUser as User, response);
  }
}
