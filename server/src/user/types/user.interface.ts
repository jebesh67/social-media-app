import { SafeUser } from '@/user/types/user.type';

export interface IUserResponse {
  user: SafeUser;
  token: string;
}
