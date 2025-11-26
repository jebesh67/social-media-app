import { ClientUser } from "@/core/types/user/user.type";

export interface ICurrentUserBackendResponse {
  currentUserProfile: {
    user: ClientUser;
  };
}

