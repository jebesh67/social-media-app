import { Field, ObjectType } from '@nestjs/graphql';
import { VerifyAccessType } from '@/modules/user/types/objects/verifyAccess.object';

@ObjectType()
export class VerifyAccessResponse {
  @Field(() => VerifyAccessType)
  data: VerifyAccessType;
}
