import axios, { AxiosResponse } from "axios";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { ISignCloudinaryResponse } from "@/types/cloudinary/response/api/ISIgnCloudinary.response";

export const signCloudinaryHelper = async (): Promise<ISignCloudinaryResponse | IApiError> => {
  try {
    const signatureResponse: AxiosResponse<ISignCloudinaryResponse | IApiError> = await axios.get(
      "/api/cloudinary/sign-upload");
    
    if (!signatureResponse.data.success) {
      const errorResponse = signatureResponse.data as IApiError;
      
      return {
        success: errorResponse.success,
        message: errorResponse.message,
        statusCode: errorResponse.statusCode,
      };
    }
    
    const goodResponse = signatureResponse.data as ISignCloudinaryResponse;
    
    return {
      success: goodResponse.success,
      message: goodResponse.message,
      data: goodResponse.data,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        success: false,
        message:
          err.response?.data?.message ??
          "Unable to reach Cloudinary sign endpoint",
        statusCode: err.response?.status ?? 500,
      };
    }
    
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error occurred",
      statusCode: 500,
    };
  }
};