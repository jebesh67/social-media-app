import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CacheService } from '@/common/cache/cache.service';
import { UserResponse } from '@/modules/user/type/response/user.response';
import { BackendError } from '@/common/backend-error/util/backendError.util';
import { ExistingUsernameResponse } from '@/modules/user/type/response/existingUsername.response';
import { SafeUserType } from '@/modules/user/type/object/safeUser.object';
import { UserDataCount } from '@/modules/user/type/user.type';
import { UpdateUserProfileInput } from '@/modules/user/type/input/updateUserProfile.input';
import { UpdateUserResponse } from '@/modules/user/type/response/updateUser.response';
import { UpdateUsernameInput } from '@/modules/user/type/input/updateUsername.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly USER_CACHE_TTL: number = 20;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async verifyUsername(username: string): Promise<ExistingUsernameResponse> {
    const isTaken: boolean = await this.checkExistingUser(username);

    return {
      username: {
        isAvailable: !isTaken,
        message: isTaken
          ? `${username} is not available`
          : `${username} is available`,
      },
    };
  }

  async getCurrentUser(currentUser: User): Promise<User> {
    const cacheKey = `user:${currentUser.username}`;
    const cachedUser: User | undefined = await this.cache.get<User>(cacheKey);

    if (cachedUser) return cachedUser;

    // cache user
    await this.cache.set<User>(cacheKey, currentUser, this.USER_CACHE_TTL);

    return currentUser;
  }

  async getOtherUserProfile(
    username: string,
    currentUser: User,
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
    await this.cache.set<User>(`user:${username}`, user, this.USER_CACHE_TTL);

    return user;
  }

  async updateUserProfile(
    currentUser: User,
    updateUserProfileInput: UpdateUserProfileInput,
  ): Promise<User> {
    const data: Partial<UpdateUserProfileInput> = Object.fromEntries(
      Object.entries(updateUserProfileInput).filter(
        ([, value]: [string, any]): boolean =>
          value !== undefined && value !== null,
      ),
    );

    if (Object.keys(data).length === 0) {
      throw BackendError.BadRequest('No valid fields provided to update');
    }

    const updatedUser: User = await this.prisma.user.update({
      where: { id: currentUser.id },
      data,
    });

    // cache user
    await this.cache.set<User>(
      `user:${updatedUser.username}`,
      updatedUser,
      this.USER_CACHE_TTL,
    );

    return updatedUser;
  }

  async updateUsername(
    input: UpdateUsernameInput,
    currentUser: User,
  ): Promise<User> {
    const isPasswordMatching: boolean = await bcrypt.compare(
      input.password,
      currentUser.password,
    );

    if (!isPasswordMatching) {
      throw BackendError.BadRequest('Wrong password!');
    }

    const isTaken: boolean = await this.checkExistingUser(input.username);

    if (isTaken) {
      throw BackendError.Conflict('Username is already taken');
    }

    const updatedUser: User = await this.prisma.user.update({
      where: { id: currentUser.id },
      data: {
        username: input.username,
      },
    });

    // cache user
    await this.cache.set<User>(
      `user:${updatedUser.username}`,
      updatedUser,
      this.USER_CACHE_TTL,
    );

    if (currentUser.username !== updatedUser.username) {
      await this.cache.del(`user:${currentUser.username}`);
    }

    return updatedUser;
  }

  // Helpers

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

  async generateSafeUser(user: User): Promise<SafeUserType> {
    const { password, ...safeUser } = user;

    const counts: UserDataCount = await this.getUserCounts(user);

    return {
      ...safeUser,
      ...counts,
    };
  }

  async generateUserResponse(user: User): Promise<UserResponse> {
    const safeUser: SafeUserType = await this.generateSafeUser(user);

    return {
      user: {
        ...safeUser,
      },
    };
  }

  async generateUpdateUserResponse(
    user: User,
    message: string,
  ): Promise<UpdateUserResponse> {
    const safeUser: SafeUserType = await this.generateSafeUser(user);

    return {
      success: true,
      user: safeUser,
      message,
    };
  }
}
