import { User } from "@/types/user/user.type";

export interface IUserBackendResponse {
  user: User;
  token: string;
}

export interface IUserRouteResponse {
  success: boolean;
  message: string;
  user: User;
}