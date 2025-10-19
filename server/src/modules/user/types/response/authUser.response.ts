import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/types/objects/safeUser.object';

@ObjectType()
export class AuthUserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;

  @Field() token: string;
}
