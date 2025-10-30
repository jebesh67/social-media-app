import { User } from "@/types/user/user.type";

export interface IUserApiResponse {
  success: boolean;
  message: string;
  user: User;
}