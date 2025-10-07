import { User } from '@prisma/client';

export interface IUserResponse {
  user: Omit<User, 'password'>;
}
