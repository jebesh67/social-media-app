"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import LogoutUserQuery from "@/graphql/user/query/logoutUser.query.graphql";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import { clearAuthToken, getAuthToken } from "@/core/utils/cookie/cookie.helper";
import { ILogoutUserBackendResponse } from "@/core/types/user/response/backend/logoutUserBackend.response";
import { ILogoutApiResponse } from "@/core/types/user/response/api/logoutApi.response";
import { extractOriginalError } from "@/core/helper/error/extractOriginalError.helper";

export const POST = async (): Promise<NextResponse<ILogoutApiResponse | IApiError>> => {
  try {
    const token: string = await getAuthToken();
    
    const response: ILogoutUserBackendResponse = await request(GRAPHQL_URL, LogoutUserQuery, {}, {
      Authorization: `Bearer ${ token }`,
    });
    
    const res: NextResponse<ILogoutApiResponse> = NextResponse.json<ILogoutApiResponse>({
      success: true,
      message: "logout successful",
      isCacheCleared: response.logoutUser,
    });
    
    await clearAuthToken();
    
    return res;
  } catch (err: unknown) {
    if (err instanceof ClientError) {
      const originalError: IOriginalError = extractOriginalError(err);
      
      return NextResponse.json<IApiError>({
        success: false,
        message: originalError.message,
        statusCode: originalError.statusCode,
      }, {status: originalError.statusCode});
    }
    
    if (err instanceof Error) {
      return NextResponse.json<IApiError>({
        success: false,
        message: err.message || "Internal server error, failed to clear cache",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Internal server error, failed to clear cache",
      statusCode: 500,
    }, {status: 500});
  }
};







