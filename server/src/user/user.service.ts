import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUser } from '@/user/types/user.type';
import { IUserResponse } from '@/user/types/user.interface';

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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkExistingUser(username: string): Promise<boolean> {
    const existingUser: User | null = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return !!existingUser;
  }

  generateUserResponse(user: User): IUserResponse {
    const { password, ...safeUser } = user;

    return {
      user: safeUser,
    };
  }
}
