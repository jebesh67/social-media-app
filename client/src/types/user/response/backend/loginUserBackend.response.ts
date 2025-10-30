import { User } from "@/types/user/user.type";

export interface ILoginUserBackendResponse {
  loginUser: {
    user: User;
    token: string
  };
}