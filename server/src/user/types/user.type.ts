import { User } from '@prisma/client';

export type CreateUser = {
  username: string;
  email: string;
  password: string;
};

export type SafeUser = Omit<User, 'password'>;

export type UserDataCount = {
  counts: {
    followersCount: number;
    followingCount: number;
    postsCount: number;
  };
};
