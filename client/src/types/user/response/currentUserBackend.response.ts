import { User } from "@/types/user/user.type";

export interface ICurrentUserBackendResponse {
  currentUserProfile: {
    user: User;
  };
}

