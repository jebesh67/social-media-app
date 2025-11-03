import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyAccessType {
  @Field()
  accessGranted: boolean;

  @Field()
  username: string;

  @Field()
  message: string;
}
