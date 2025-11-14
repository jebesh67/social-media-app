import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/type/object/safeUser.object';

@ObjectType()
export class AuthUserResponse {
  @Field(() => SafeUserType)
  user: SafeUserType;

  @Field() token: string;
}
