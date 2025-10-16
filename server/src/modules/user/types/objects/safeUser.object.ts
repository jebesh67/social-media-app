import { Field, ObjectType } from '@nestjs/graphql';
import { UserCountType } from '@/modules/user/types/objects/userCount.object';

@ObjectType()
export class SafeUserType {
  @Field() id: string;
  @Field() name: string;
  @Field() username: string;
  @Field() email: string;
  @Field() avatar: string;
  @Field() bio: string;

  @Field(() => UserCountType)
  counts: UserCountType;

  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}
