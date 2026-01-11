import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchUserObject {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  avatarUrl: string;
}
