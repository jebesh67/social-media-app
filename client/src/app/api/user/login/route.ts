"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import LoginUserMutation from "@/graphql/user/mutation/loginUser.mutation.graphql";
import {
  ICurrentUserBackendResponse,
  
} from "@/types/user/response/currentUserBackend.response";
import { getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IBackendErrorResponse } from "@/types/error-response/graphql-error/backendError.response";
import { IUserApiResponse } from "@/types/user/response/userApi.response";

export async function POST(): Promise<NextResponse<IUserApiResponse | IApiError>> {
  try {
    const token: string = await getAuthToken();
    const GRAPHQL_URL: string = process.env.NEST_GRAPHQL_URL!;
    
    const response: ICurrentUserBackendResponse = await request(GRAPHQL_URL, LoginUserMutation, {
      input: {
        username: "jebesh",
        password: "jebesh123",
      },
    }, {
      Authorization: `Bearer ${ token }`,
    });
    
    return NextResponse.json<IUserApiResponse>({
      success: true,
      message: "User fetched successfully",
      user: response.loginUser.user,
    });
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
        message: "Internal server error",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Internal server error",
      statusCode: 500,
    }, {status: 500});
  }
}







