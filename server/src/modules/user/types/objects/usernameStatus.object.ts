import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsernameStatusType {
  @Field() isAvailable: boolean;

  @Field() message: string;
}
