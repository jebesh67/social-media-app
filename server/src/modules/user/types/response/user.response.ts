import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/types/objects/safeUser.object';

@ObjectType()
export class UserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;

  @Field() token: string;
}
