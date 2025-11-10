import { ClientUser } from "@/types/user/user.type";

export interface IUpdateUserProfileBackendResponse {
  success: boolean;
  message: string;
  user: ClientUser;
}