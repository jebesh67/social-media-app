import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CacheService } from '@/common/cache/cache.service';
import { SafeUserType, UserDataCount } from '@/modules/user/types/user.type';
import { LoginUserInput } from '@/modules/user/types/inputs/loginUser.input';
import { CreateUserInput } from '@/modules/user/types/inputs/createUser.input';
import { OtherUserResponse } from '@/modules/user/types/response/otherUser.response';
import { UserResponse } from '@/modules/user/types/response/user.response';
import { BackendError } from '@/common/backend-error/util/backendError.util';
import { ExistingUsernameResponse } from '@/modules/user/types/response/existingUsername.response';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async verifyUsername(username: string): Promise<ExistingUsernameResponse> {
    const isTaken: boolean = await this.checkExistingUser(username);

    return {
      username: {
        isAvailable: isTaken,
        message: isTaken
          ? `${username} is not available`
          : `${username} is available`,
      },
    };
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const isExistingUser: boolean = await this.checkExistingUser(
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
    const user: User | null = await this.getUserByUsername(
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

  async getCurrentUser(currentUser: Partial<User>): Promise<User> {
    if (!currentUser?.id) {
      throw BackendError.BadRequest('Invalid or expired token, User not found');
    }

    const cacheKey = `user:${currentUser.username}`;
    const cachedUser: User | undefined = await this.cache.get<User>(cacheKey);

    if (cachedUser) return cachedUser;

    const newUser = currentUser as User;

    // cache user
    await this.cache.set<User>(cacheKey, newUser, 20);

    return newUser;
  }

  async getOtherUserProfile(
    username: string,
    currentUser: Partial<User>,
  ): Promise<User> {
    if (currentUser.username === username) return currentUser as User;
    // check for caches
    const cachedUser: User | undefined = await this.cache.get<User>(
      `user:${username}`,
    );
    if (cachedUser) {
      return cachedUser;
    }

    const user: User | null = await this.getUserByUsername(username);
    if (!user) throw BackendError.NotFound('User not found!');

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

  generateToken(user: User | SafeUserType): string {
    const payload = { id: user.id, username: user.username };

    return sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }

  async getUserCounts(user: User | SafeUserType): Promise<UserDataCount> {
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

  async generateUserResponse(user: User): Promise<UserResponse> {
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

  async generateOtherUserResponse(user: User): Promise<OtherUserResponse> {
    const { password, ...safeUser } = user;

    const counts: UserDataCount = await this.getUserCounts(user);

    return {
      user: {
        ...safeUser,
        ...counts,
      },
    };
  }
}
