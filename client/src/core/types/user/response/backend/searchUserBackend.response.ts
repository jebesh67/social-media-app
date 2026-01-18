import { SearchUserType } from "@/core/types/user/searchUser.type";

export interface ISearchUserBackendResponse {
  findUsers: {
    users: SearchUserType[];
  };
}