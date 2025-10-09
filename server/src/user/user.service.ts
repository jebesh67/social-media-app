import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
import { CacheService } from '@/cache/cache.service';
import { SafeUser, UserDataCount } from '@/user/types/user.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

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

    const createdUser: User = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    // cache user
    await this.cache.set<User>(`user:${createdUser.username}`, createdUser, 20);

    return createdUser;
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

    // cache user
    await this.cache.set<User>(`user:${user.username}`, user, 20);

    return user;
  }

  async logoutUser(): Promise<void> {
    try {
      await this.cache.clearAll();
    } catch (err) {
      throw new InternalServerErrorException('Failed to clear caches');
    }
  }

  async getCurrentUser(currentUser: Partial<SafeUser>): Promise<SafeUser> {
    if (!currentUser?.id) {
      throw new BadRequestException('Invalid or expired token, User not found');
    }

    return currentUser as SafeUser;
  }

  async getUserProfile(username: string): Promise<User> {
    // check for caches
    const cachedUser: User | undefined = await this.cache.get<User>(
      `user:${username}`,
    );
    if (cachedUser) {
      console.log('got cached user');
      return cachedUser;
    }

    const user: User | null = await this.getUserByUsername(username);
    if (!user) throw new NotFoundException('User not found!');

    // cache user
    await this.cache.set<User>(`user:${username}`, user, 20);

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

  generateToken(user: User | SafeUser): string {
    const payload = { id: user.id, username: user.username };

    return sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  }

  async getUserCounts(user: User | SafeUser): Promise<UserDataCount> {
    const [followersCount, followingCount, postsCount] = await Promise.all([
      this.prisma.follow.count({ where: { followingId: user.id } }),
      this.prisma.follow.count({ where: { followerId: user.id } }),
      this.prisma.post.count({ where: { authorId: user.id } }),
    ]);

    return {
      counts: {
        followersCount,
        followingCount,
        postsCount,
      },
    };
  }

  async generateUserResponse(user: User): Promise<IUserResponse> {
    const { password, ...safeUser } = user;

    const counts: UserDataCount = await this.getUserCounts(user);

    const token: string = this.generateToken(user);

    return {
      user: {
        ...safeUser,
        ...counts,
      },
      token,
    };
  }

  async generateSafeUserResponse(user: SafeUser): Promise<IUserResponse> {
    const counts: UserDataCount = await this.getUserCounts(user);
    const token: string = this.generateToken(user);

    return {
      user: {
        ...user,
        ...counts,
      },
      token,
    };
  }
}
