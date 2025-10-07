import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUserResponse } from '@/user/types/user.interface';
import { LoginUserDto } from '@/user/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isExistingUser: boolean = await this.checkExistingUser(
      createUserDto.username,
    );

    if (isExistingUser)
      throw new BadRequestException({ error: 'User already exists' });

    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      12,
    );

    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user: User | null = await this.getUserByUsername(
      loginUserDto.username,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatching: boolean = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async getUserProfile(username: string): Promise<User> {
    const user: User | null = await this.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async checkExistingUser(username: string): Promise<boolean> {
    const existingUser: User | null = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return !!existingUser;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  generateToken(user: User): string {
    const payload = { id: user.id, username: user.username };

    return sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  }

  generateUserResponse(user: User): IUserResponse {
    const { password, ...safeUser } = user;
    const token: string = this.generateToken(user);

    return {
      user: safeUser,
      token,
    };
  }
}
