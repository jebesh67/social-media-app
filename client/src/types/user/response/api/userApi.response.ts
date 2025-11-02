import { ClientUser } from "@/types/user/user.type";

export interface IUserApiResponse {
  success: boolean;
  message: string;
  user: ClientUser;
}