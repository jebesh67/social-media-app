"use server";

import { SearchUserType } from "@/core/types/user/searchUser.type";
import { getAuthToken } from "@/core/utils/cookie/cookie.helper";

export const searchUsersAction = async (username: string): Promise<SearchUserType[]> => {
  console.log("hi");
  const token = await getAuthToken();
  console.log(token);
  return [{
    id: "fjdksfjk",
    name: "jebesh",
    username: "jebexhh",
    avatarUrl: "",
  }];
};