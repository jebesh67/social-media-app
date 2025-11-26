import { ClientUser } from "@/core/types/user/user.type";

export interface ICreateUserBackendResponse {
  createUser: {
    user: ClientUser;
    token: string
  };
}