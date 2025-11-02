import { ClientUser } from "@/types/user/user.type";

export interface ICreateUserBackendResponse {
  createUser: {
    user: ClientUser;
    token: string
  };
}