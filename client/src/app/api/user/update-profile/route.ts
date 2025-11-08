import { getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { request } from "graphql-request";
import { NextRequest } from "next/server";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import UpdateUserProfile from "@/graphql/user/mutation/updateUserProfile.mutation.graphql";
import { ICurrentUserBackendResponse } from "@/types/user/response/backend/currentUserBackend.response";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";

export const POST = async (req: NextRequest): Promise<void> => {
  try {
    const token: string = await getAuthToken();
    
    const data: IUpdateProfileVariables = await req.json();
    
    console.log(data);
    
    const response: ICurrentUserBackendResponse = await request(GRAPHQL_URL, UpdateUserProfile, {
      input: {
        ...data,
      },
    }, {
      Authorization: `Bearer ${ token }`,
    });
    
    console.log(response);
    
  } catch (err) {
  
  }
};