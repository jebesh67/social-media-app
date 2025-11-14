import { Field, ObjectType } from '@nestjs/graphql';
import { VerifyAccessType } from '@/modules/auth/type/object/verifyAccess.object';

@ObjectType()
export class VerifyAccessResponse {
  @Field(() => VerifyAccessType)
  data: VerifyAccessType;
}
