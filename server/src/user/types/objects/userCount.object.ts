import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCountType {
  @Field(() => Int)
  followersCount: number;

  @Field(() => Int)
  followingCount: number;

  @Field(() => Int)
  postsCount: number;
}
