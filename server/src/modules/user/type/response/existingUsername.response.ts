import { Field, ObjectType } from '@nestjs/graphql';
import { UsernameStatusType } from '@/modules/user/type/object/usernameStatus.object';

@ObjectType()
export class ExistingUsernameResponse {
  @Field(() => UsernameStatusType)
  username: UsernameStatusType;
}
