"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import LoginUserMutation from "@/graphql/user/mutation/loginUser.mutation.graphql";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import { IBackendErrorResponse } from "@/core/types/error/graphql-error/response/backendError.response";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { ILoginUserBackendResponse } from "@/core/types/user/response/backend/loginUserBackend.response";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import { setAuthToken } from "@/core/utils/cookie/cookie.helper";

export const POST = async (req: Request): Promise<NextResponse<IUserApiResponse | IApiError>> => {
  try {
    const {username, password} = await req.json();
    
    const response: ILoginUserBackendResponse = await request(GRAPHQL_URL, LoginUserMutation, {
      input: {
        username,
        password,
      },
    });
    
    const token: string = response.loginUser.token;
    
    const res: NextResponse<IUserApiResponse> = NextResponse.json<IUserApiResponse>({
      success: true,
      message: "User logged in successfully",
      user: response.loginUser.user,
    });
    
    await setAuthToken(token);
    
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
        message: err.message || "Internal server error, login failed",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Internal server error, login failed",
      statusCode: 500,
    }, {status: 500});
  }
};







