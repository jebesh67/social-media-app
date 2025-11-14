import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { VerifyAccessResponse } from '@/modules/auth/type/response/verifyAccess.response';
import { VerifyAccessType } from '@/modules/auth/type/object/verifyAccess.object';
import { CreateUserInput } from '@/modules/auth/type/input/createUser.input';
import { BackendError } from '@/common/backend-error/util/backendError.util';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '@/common/cache/cache.service';
import { UserService } from '@/modules/user/user.service';
import { LoginUserInput } from '@/modules/auth/type/input/loginUser.input';
import { AuthUserResponse } from '@/modules/auth/type/response/authUser.response';
import { SafeUserType } from '@/modules/user/type/object/safeUser.object';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly userService: UserService,
  ) {}

  async verifyAccess(
    currentUser: Partial<User>,
  ): Promise<VerifyAccessResponse> {
    if (!currentUser.id) {
      return {
        data: {
          accessGranted: false,
          username: '',
          message: 'Access not granted',
        },
      };
    }

    const verifiedUser: User = currentUser as User;

    const response: VerifyAccessType = {
      accessGranted: true,
      username: verifiedUser.username,
      message: 'Access granted',
    };

    return {
      data: response,
    };
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const isExistingUser: boolean = await this.userService.checkExistingUser(
      createUserInput.username,
    );

    if (isExistingUser) throw BackendError.Conflict('User already exists');

    const hashedPassword: string = await bcrypt.hash(
      createUserInput.password,
      12,
    );

    const createdUser: User = await this.prisma.user.create({
      data: {
        name: createUserInput.name,
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashedPassword,
      },
    });

    // cache user
    await this.cache.set<User>(`user:${createdUser.username}`, createdUser, 20);

    return createdUser;
  }

  async loginUser(loginUserInput: LoginUserInput): Promise<User> {
    const user: User | null = await this.userService.getUserByUsername(
      loginUserInput.username,
    );

    if (!user) {
      throw BackendError.Unauthorized('Invalid credentials');
    }

    const isPasswordMatching: boolean = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw BackendError.Unauthorized('Invalid credentials');
    }

    // cache user
    await this.cache.set<User>(`user:${user.username}`, user, 20);

    return user;
  }

  async logoutUser(): Promise<void> {
    try {
      await this.cache.clearAll();
    } catch (err) {
      throw BackendError.Internal('Failed to clear caches');
    }
  }

  generateToken(user: User | SafeUserType): string {
    const payload = { id: user.id, username: user.username };

    return sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }

  async generateAuthUserResponse(user: User): Promise<AuthUserResponse> {
    const safeUser: SafeUserType =
      await this.userService.generateSafeUser(user);

    const token: string = this.generateToken(user);

    return {
      user: {
        ...safeUser,
      },
      token,
    };
  }
}
