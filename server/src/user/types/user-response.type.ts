import { SafeUserType } from '@/user/types/user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;

  @Field() token: string;
}

@ObjectType()
export class OtherUserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;
}
