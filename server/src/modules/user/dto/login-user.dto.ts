import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  password: string;
}
