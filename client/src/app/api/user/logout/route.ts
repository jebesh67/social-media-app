"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import LogoutUserQuery from "@/graphql/user/query/logoutUser.query.graphql";
import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IBackendErrorResponse } from "@/types/error-response/graphql-error/backendError.response";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import { clearAuthToken, getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { ILogoutUserBackendResponse } from "@/types/user/response/backend/logoutUserBackend.response";
import { ILogoutApiResponse } from "@/types/user/response/api/logoutApi.response";

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
      const backendError: IBackendErrorResponse = err as unknown as IBackendErrorResponse;
      
      const originalError: IOriginalError =
        backendError.response.errors[0].extensions.originalError;
      
      return NextResponse.json<IApiError>({
        success: false,
        message: originalError.message,
        statusCode: originalError.statusCode,
      }, {status: originalError.statusCode});
    }
    
    if (err instanceof Error) {
      return NextResponse.json<IApiError>({
        success: false,
        message: "Internal server error, failed to clear cache",
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







