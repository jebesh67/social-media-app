import { User } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export type SafeUser = Omit<User, 'password'>;

export type UserDataCount = {
  counts: {
    followersCount: number;
    followingCount: number;
    postsCount: number;
  };
};

@ObjectType()
export class UserDataCountType {
  @Field(() => Int)
  followersCount: number;

  @Field(() => Int)
  followingCount: number;

  @Field(() => Int)
  postsCount: number;
}

@ObjectType()
export class SafeUserType {
  @Field() id: string;
  @Field() name: string;
  @Field() username: string;
  @Field() email: string;
  @Field() avatar: string;
  @Field() bio: string;

  @Field(() => UserDataCountType)
  counts: UserDataCountType;

  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}
