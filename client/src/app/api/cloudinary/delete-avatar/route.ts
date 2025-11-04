import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IDeleteAvatarResponse } from "@/types/cloudinary/response/api/deleteAvatar.response";
import { DeleteAvatarType } from "@/types/cloudinary/deleteAvatar.type";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async (req: NextRequest) => {
  try {
    const {publicId} = await req.json();
    
    if (!publicId) {
      return NextResponse.json<IApiError>({
        success: false,
        message: "Missing publicId",
        statusCode: 400,
      });
    }
    
    const result: DeleteAvatarType = await cloudinary.uploader.destroy(publicId);
    
    return NextResponse.json<IDeleteAvatarResponse>({success: true, result});
  } catch (err: any) {
    console.error("Cloudinary delete failed:", err);
    return NextResponse.json<IApiError>({
      success: false,
      message: "Failed to delete image",
      statusCode: 500,
    });
  }
};
