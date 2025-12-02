import { Field, ObjectType } from '@nestjs/graphql';
import { SafeUserType } from '@/modules/user/type/object/safeUser.object';

@ObjectType()
export class UpdateUserResponse {
  @Field(() => SafeUserType, { nullable: true })
  user?: SafeUserType;

  @Field()
  message: string;

  @Field()
  success: boolean;
}
