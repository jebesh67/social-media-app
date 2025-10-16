import { SafeUser, UserDataCount } from '@/modules/user/types/user.type';

export interface IUserResponse {
  user: SafeUser & UserDataCount;
  token: string;
}

export interface IOtherUserResponse {
  user: SafeUser & UserDataCount;
}
