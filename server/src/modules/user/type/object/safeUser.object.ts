import { Field, ObjectType } from '@nestjs/graphql';
import { UserCountType } from '@/modules/user/type/object/userCount.object';

@ObjectType()
export class SafeUserType {
  @Field() id: string;
  @Field() name: string;
  @Field() username: string;
  @Field() email: string;
  @Field() avatarUrl: string;
  @Field() avatarPublicId: string;
  @Field() bio: string;

  @Field(() => UserCountType)
  counts: UserCountType;

  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}
