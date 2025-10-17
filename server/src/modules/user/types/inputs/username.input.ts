import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class UsernameInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Matches(/^\S+$/, { message: 'Username must not contain spaces' })
  username: string;
}
