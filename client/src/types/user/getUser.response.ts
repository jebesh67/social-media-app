import { User } from "@/types/user/user.type";

export interface ICurrentUserBackendResponse {
  user: User;
  token: string;
}

export interface IOtherUserBackendResponse {
  user: User;
}

export interface IUserApiResponse {
  success: boolean;
  message: string;
  user: User;
}