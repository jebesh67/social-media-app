import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
