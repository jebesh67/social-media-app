import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloudinary.config";
import { IApiError } from "@/types/error/api-error/response/apiError.response";
import { IDeleteAvatarResponse } from "@/types/cloudinary/response/api/deleteAvatar.response";
import { DeleteAvatarType } from "@/types/cloudinary/deleteAvatar.type";
import { IVerifyAccessBackendResponse } from "@/types/user/response/backend/verifyAccessBackend.response";
import { request } from "graphql-request";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import VerifyAccessQuery from "@/graphql/user/query/verifyAccess.query.graphql";
import { getAuthToken } from "@/common/utils/cookie/cookie.helper";

export const POST = async (req: NextRequest): Promise<NextResponse<IApiError | IDeleteAvatarResponse>> => {
  try {
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
    
    const {publicId} = await req.json();
    
    if (!publicId) {
      return NextResponse.json<IApiError>({
        success: false,
        message: "Missing publicId",
        statusCode: 400,
      }, {status: 400});
    }
    
    const result: DeleteAvatarType = await cloudinary.uploader.destroy(publicId);
    
    return NextResponse.json<IDeleteAvatarResponse>({success: true, result});
  } catch {
    
    return NextResponse.json<IApiError>({
      success: false,
      message: "Failed to delete image",
      statusCode: 500,
    }, {status: 500});
  }
};
