import { ClientUser } from "@/core/types/user/user.type";

export type UpdateProfileType = {
  success: boolean;
  message: string;
  user: ClientUser;
}