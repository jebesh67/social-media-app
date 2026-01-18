import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloudinary.config";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/env/cloudinary.variable";
import { ISignCloudinaryResponse } from "@/core/types/cloudinary/response/api/ISIgnCloudinary.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import { ClientError, request } from "graphql-request";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import { getAuthToken } from "@/core/utils/cookie/cookie.helper";
import VerifyAccessQuery from "@/graphql/user/query/verifyAccess.query.graphql";
import { IVerifyAccessBackendResponse } from "@/core/types/user/response/backend/verifyAccessBackend.response";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";
import { extractOriginalError } from "@/core/helper/error/extractOriginalError.helper";

export const GET = async (): Promise<
  NextResponse<ISignCloudinaryResponse | IApiError>
> => {
  try {
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_API_SECRET) {
      return NextResponse.json<IApiError>({
        success: false,
        message: "Missing required Cloudinary environment variables.",
        statusCode: 500,
      }, {status: 500});
    }
    
    const token: string = await getAuthToken();
    
    const response: IVerifyAccessBackendResponse = await request(GRAPHQL_URL, VerifyAccessQuery, {}, {
      Authorization: `Bearer ${ token }`,
    });
    
    
    if (!response.verifyAccess.data.accessGranted) {
      return NextResponse.json<IApiError>({
        success: false,
        message: response.verifyAccess.data.message,
        statusCode: 403,
      }, {status: 403});
    }
    
    const timestamp: number = Math.round(Date.now() / 1000);
    
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
      },
      CLOUDINARY_API_SECRET,
    );
    
    return NextResponse.json<ISignCloudinaryResponse>({
      success: true,
      message: "Cloudinary upload signed successfully.",
      username: response.verifyAccess.data.username,
      data: {
        timestamp,
        signature,
        apiKey: CLOUDINARY_API_KEY,
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      },
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
        message: err.message || "Internal server error!",
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
