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
import { UpdateUserProfileResponse } from '@/modules/user/type/response/updateUserProfile.response';

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
        isAvailable: !isTaken,
        message: isTaken
          ? `${username} is not available`
          : `${username} is available`,
      },
    };
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

  async updateUserProfile(
    currentUser: User,
    updateUserProfileInput: UpdateUserProfileInput,
  ): Promise<UpdateUserProfileResponse> {
    const data: Partial<UpdateUserProfileInput> = Object.fromEntries(
      Object.entries(updateUserProfileInput).filter(
        ([, value]: [string, any]): boolean =>
          value !== undefined && value !== null,
      ),
    );

    if (Object.keys(data).length === 0) {
      return {
        success: false,
        message: 'No valid fields provided to update.',
      };
    }

    const updatedUser: User = await this.prisma.user.update({
      where: { id: currentUser.id },
      data,
    });

    // cache user
    await this.cache.set<User>(`user:${updatedUser.username}`, updatedUser, 20);

    const safeUser: SafeUserType = await this.generateSafeUser(updatedUser);

    return {
      success: true,
      message: 'Profile updated successfully.',
      user: safeUser,
    };
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
}
