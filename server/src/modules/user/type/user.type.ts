import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'password'>;

export type UserDataCount = {
  counts: {
    followersCount: number;
    followingCount: number;
    postsCount: number;
  };
};
