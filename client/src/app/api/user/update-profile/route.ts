import { getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { ClientError, request } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import UpdateUserProfile from "@/graphql/user/mutation/updateUserProfile.mutation.graphql";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";
import { IBackendErrorResponse } from "@/types/error/graphql-error/response/backendError.response";
import { IOriginalError } from "@/types/error/graphql-error/response/originalError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IApiError } from "@/types/error/api-error/response/apiError.response";
import { IUpdateUserProfileBackendResponse } from "@/types/user/response/backend/updateProfileBackend.response";
import { UpdateProfileType } from "@/types/user/updateProfile.type";

export const POST = async (req: NextRequest): Promise<NextResponse<IUserApiResponse | IApiError>> => {
  try {
    const token: string = await getAuthToken();
    
    const data: IUpdateProfileVariables = await req.json();
    
    const response: IUpdateUserProfileBackendResponse = await request(GRAPHQL_URL, UpdateUserProfile, {
      input: {
        ...data,
      },
    }, {
      Authorization: `Bearer ${ token }`,
    });
    
    const extractedResponse: UpdateProfileType = response.updateUserProfile;
    
    return NextResponse.json<IUserApiResponse>({
      success: extractedResponse.success,
      message: extractedResponse.message,
      user: extractedResponse.user,
    });
    
  } catch (err: unknown) {
    if (err instanceof ClientError) {
      const backendError = err as unknown as IBackendErrorResponse;
      const originalError: IOriginalError = backendError.response.errors[0].extensions.originalError;
      
      return NextResponse.json<IApiError>({
        success: false,
        message: originalError.message,
        statusCode: originalError.statusCode,
      }, {status: originalError.statusCode});
    }
    
    if (err instanceof Error) {
      return NextResponse.json<IApiError>({
        success: false,
        message: err.message || "Update user failed!",
        statusCode: 500,
      }, {status: 500});
    }
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Oops! Something went wrong",
      statusCode: 500,
    }, {status: 500});
    
  }
};