import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/types/objects/safeUser.object';

@ObjectType()
export class OtherUserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;
}
