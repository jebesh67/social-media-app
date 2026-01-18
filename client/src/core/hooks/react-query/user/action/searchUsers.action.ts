"use server";

import { SearchUserType } from "@/core/types/user/searchUser.type";
import { getAuthToken } from "@/core/utils/cookie/cookie.helper";
import { ClientError, request } from "graphql-request";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import FindUsersQuery from "@/graphql/user/query/searchUser.query.graphql";
import { ISearchUserBackendResponse } from "@/core/types/user/response/backend/searchUserBackend.response";
import { extractOriginalError } from "@/core/helper/error/extractOriginalError.helper";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";

export const searchUsersAction = async (username: string): Promise<SearchUserType[]> => {
  try {
    const token: string = await getAuthToken();
    const response: ISearchUserBackendResponse = await request<ISearchUserBackendResponse>(
      GRAPHQL_URL,
      FindUsersQuery,
      {
        input: {
          username,
        },
        
      }, {
        Authorization: `Bearer ${ token }`,
      },
    );
    
    return response.findUsers.users;
  } catch (err: unknown) {
    if (err instanceof ClientError) {
      const originalError: IOriginalError = extractOriginalError(err);
      console.error(originalError);
    }
    return [];
  }
};