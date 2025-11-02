import { ClientUser } from "@/types/user/user.type";

export interface ILoginUserBackendResponse {
  loginUser: {
    user: ClientUser;
    token: string
  };
}