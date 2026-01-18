"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import CurrentUserQuery from "@/graphql/user/query/currentUser.query.graphql";
import {
  ICurrentUserBackendResponse,
  
} from "@/core/types/user/response/backend/currentUserBackend.response";
import { getAuthToken } from "@/core/utils/cookie/cookie.helper";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import { extractOriginalError } from "@/core/helper/error/extractOriginalError.helper";

export const GET = async (): Promise<NextResponse<IUserApiResponse | IApiError>> => {
  try {
    const token: string = await getAuthToken();
    
    const response: ICurrentUserBackendResponse = await request(GRAPHQL_URL, CurrentUserQuery, {}, {
      Authorization: `Bearer ${ token }`,
    });
    
    return NextResponse.json<IUserApiResponse>({
      success: true,
      message: "User fetched successfully",
      user: response.currentUserProfile.user,
    });
    
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
        message: err.message || "Fetch user failed!",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Internal server error",
      statusCode: 500,
    }, {status: 500});
  }
};







