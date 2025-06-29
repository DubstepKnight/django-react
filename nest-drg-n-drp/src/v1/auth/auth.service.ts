import { hash, genSalt, compare } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from 'src/v1/user/user.service';
import { EXPIRES_AT } from './auth.module';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async loginJwt(user: User, password: string, response: Response) {
    try {
      const validatedUser = await this.validateUser(user, password);

      if (validatedUser === null) {
        throw new UnauthorizedException('The password is wrong!');
      }

      const payload = { email: user.email, sub: validatedUser.id };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      const refreshTokenExpiresAt = new Date();
      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

      const tokenExpiresAt = new Date();
      tokenExpiresAt.setDate(tokenExpiresAt.getMinutes() + EXPIRES_AT);

      this.userService.updateUser(validatedUser.id, {
        refreshToken: await hash(refreshToken, 10),
        refreshTokenExpirationDate: refreshTokenExpiresAt,
      });

      response.cookie('auth', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: tokenExpiresAt,
      });

      response.cookie('logged_in', true, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: tokenExpiresAt,
      });

      response.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: refreshTokenExpiresAt,
      });

      return {
        email: user.email,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async validateUser(
    user: User,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const result = await compare(password, user.password);

      if (result) {
        const { password, ...rest } = user;
        return rest;
      }
      return null;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async logoutJwt(response: Response) {
    response.cookie('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: new Date(),
    });

    response.cookie('logged_in', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: new Date(),
    });

    response.cookie('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: new Date(),
    });
  }

  async hashPassword(password): Promise<string> {
    try {
      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error(error);
    }
  }

  async refreshTokens(user: User, response: Response) {
    try {
      const payload = { email: user.email, sub: user.id };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      const refreshTokenExpiresAt = new Date();
      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

      const tokenExpiresAt = new Date();
      tokenExpiresAt.setDate(tokenExpiresAt.getMinutes() + EXPIRES_AT);

      this.userService.updateUser(user.id, {
        refreshToken: await hash(refreshToken, 10),
        refreshTokenExpirationDate: refreshTokenExpiresAt,
      });

      response.cookie('auth', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: tokenExpiresAt,
      });

      response.cookie('logged_in', true, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: tokenExpiresAt,
      });

      response.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: refreshTokenExpiresAt,
      });

      return {
        email: user.email,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyUserRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.userService.findById(userId);

      if (!user || !user.refreshToken || !user.refreshTokenExpirationDate) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isTokenExpired = new Date() > user.refreshTokenExpirationDate;
      if (isTokenExpired) {
        throw new UnauthorizedException('Refresh token has expired');
      }

      const isRefreshTokenValid = await compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
