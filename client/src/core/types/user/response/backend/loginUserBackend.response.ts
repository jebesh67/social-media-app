import { ClientUser } from "@/core/types/user/user.type";

export interface ILoginUserBackendResponse {
  loginUser: {
    user: ClientUser;
    token: string
  };
}