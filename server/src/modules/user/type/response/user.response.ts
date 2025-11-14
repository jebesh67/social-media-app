import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/type/object/safeUser.object';

@ObjectType()
export class UserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;
}
