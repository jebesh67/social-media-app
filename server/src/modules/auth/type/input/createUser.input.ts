import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be a string' })
  @MaxLength(14, { message: 'Username cannot exceed 14 characters' })
  @Matches(/^[a-z0-9._]+$/, {
    message:
      'Username can only contain lowercase letters, numbers, dots (.), and underscores (_).',
  })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @Matches(/^\S+$/, { message: 'password cannot contain spaces' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'confirm password cannot be empty' })
  @IsString()
  confirmPassword: string;
}
