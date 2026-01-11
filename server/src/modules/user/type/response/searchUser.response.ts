import { Field, ObjectType } from '@nestjs/graphql';
import { SearchUserObject } from '@/modules/user/type/object/searchUser.object';

@ObjectType()
export class SearchUserResponse {
  @Field(() => [SearchUserObject])
  users: SearchUserObject[];
}
