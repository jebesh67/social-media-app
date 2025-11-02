import { ClientUser } from "@/types/user/user.type";

export interface ICurrentUserBackendResponse {
  currentUserProfile: {
    user: ClientUser;
  };
}

