import { User } from "@/types/user/user.type";

export interface ICreateUserBackendResponse {
  createUser: {
    user: User;
    token: string
  };
}