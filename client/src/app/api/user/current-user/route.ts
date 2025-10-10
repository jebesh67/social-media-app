"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  ICurrentUserBackendResponse,
  IUserApiResponse,
} from "@/types/user/response/getUser.response";
import { getAuthToken, setAuthToken } from "@/utils/cookie/cookie.helper";
import { IApiError, IBackendError } from "@/types/error-response/global-error/globalError.response";
import { parseJsonResponse } from "@/utils/http/response.helper";

export async function GET(req: NextRequest): Promise<NextResponse<IUserApiResponse | IApiError>> {
  try {
    const token: string = await getAuthToken();
    const backendUrl = `${ process.env.NEXT_PUBLIC_API_URL }/user/current-user`;
    
    const response: Response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ token }`,
      },
      credentials: "include",
    });
    
    const data: ICurrentUserBackendResponse | IBackendError = await parseJsonResponse<ICurrentUserBackendResponse, IBackendError>(response);
    
    if (!response.ok) {
      const errData = data as IBackendError;
      
      return NextResponse.json<IApiError>(
        {
          success: false,
          message: errData.message || "Something went wrong",
        },
        {status: errData.statusCode || response.status},
      );
    }
    
    const userData = data as ICurrentUserBackendResponse;
    
    if (userData.token) {
      await setAuthToken(userData.token);
    }
    
    return NextResponse.json<IUserApiResponse>({
      success: true,
      message: "User fetched successfully",
      user: {...userData.user},
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json<IApiError>(
      {success: false, message: "Internal server error"},
      {status: 500},
    );
  }
}
