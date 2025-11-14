import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  password: string;
}
