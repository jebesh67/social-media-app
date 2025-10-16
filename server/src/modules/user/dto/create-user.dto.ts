import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
