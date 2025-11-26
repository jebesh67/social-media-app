import { ClientUser } from "@/core/types/user/user.type";

export interface IUserApiResponse {
  success: boolean;
  message: string;
  user: ClientUser;
}