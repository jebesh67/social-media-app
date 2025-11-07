import { getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { request } from "graphql-request";
import { NextRequest } from "next/server";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import VerifyAccessQuery from "@/graphql/user/query/verifyAccess.query.graphql";
import { ICurrentUserBackendResponse } from "@/types/user/response/backend/currentUserBackend.response";

export const POST = async (req: NextRequest): Promise<void> => {
  try {
    const token: string = await getAuthToken();
    
    const {data} = await req.json();
    
    const response: ICurrentUserBackendResponse = await request(GRAPHQL_URL, VerifyAccessQuery, {}, {
      Authorization: `Bearer ${ token }`,
    });
    
  } catch (err) {
  
  }
};