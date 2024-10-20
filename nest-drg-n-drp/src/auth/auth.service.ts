import { hash, genSalt, compare } from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async loginJwt(user: User, password: string) {
    try {
      const validatedUser = await this.validateUser(user, password);

      const payload = { email: user.email, sub: validatedUser.id };
      return {
        access_token: this.jwtService.sign(payload),
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

  async hashPassword(password): Promise<string> {
    try {
      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error(error);
    }
  }
}
