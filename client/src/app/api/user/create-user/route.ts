"use server";

import { NextResponse } from "next/server";
import { request, ClientError } from "graphql-request";
import CreateUserMutation from "@/graphql/user/mutation/createUser.mutation.graphql";
import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IBackendErrorResponse } from "@/types/error-response/graphql-error/backendError.response";
import { IUserApiResponse } from "@/types/user/response/userApi.response";
import { ICreateUserBackendResponse } from "@/types/user/response/createUserBackend.response";
import { GRAPHQL_URL } from "@/common/env/url";
import { setAuthToken } from "@/common/utils/cookie/cookie.helper";

export async function POST(req: Request): Promise<NextResponse<IUserApiResponse | IApiError>> {
  try {
    const {name, username, email, password} = await req.json();
    
    const response: ICreateUserBackendResponse = await request(GRAPHQL_URL, CreateUserMutation, {
      input: {
        name,
        username,
        email,
        password,
      },
    });
    
    const {user, token} = response.createUser;
    
    const res: NextResponse<IUserApiResponse> = NextResponse.json<IUserApiResponse>({
      success: true,
      message: "User logged in successfully",
      user,
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
        message: "Internal server error, login failed",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Internal server error, login failed",
      statusCode: 500,
    }, {status: 500});
  }
}







