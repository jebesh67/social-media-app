import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloudinary.config";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/env/cloudinary.variable";
import { ISignCloudinaryResponse } from "@/types/cloudinary/response/api/ISIgnCloudinary.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";

export async function GET(): Promise<
  NextResponse<ISignCloudinaryResponse | IApiError>
> {
  try {
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_API_SECRET) {
      return NextResponse.json<IApiError>({
        success: false,
        message: "Missing required Cloudinary environment variables.",
        statusCode: 500,
      });
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
      data: {
        timestamp,
        signature,
        apiKey: CLOUDINARY_API_KEY,
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      },
    });
  } catch (err) {
    console.error("Cloudinary sign error:", err);
    return NextResponse.json<IApiError>({
      success: false,
      message:
        err instanceof Error ? err.message : "Failed to sign Cloudinary upload.",
      statusCode: 500,
    });
  }
}
