import axios, { AxiosResponse } from "axios";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { ISignCloudinaryResponse } from "@/types/cloudinary/response/api/ISIgnCloudinary.response";

export const signCloudinaryHelper = async (): Promise<ISignCloudinaryResponse | IApiError> => {
  try {
    const signatureResponse: AxiosResponse<ISignCloudinaryResponse> = await axios.get(
      "/api/cloudinary/sign-upload");
    
    if (!signatureResponse.data.success) {
      return {
        success: false,
        message: signatureResponse.data.message,
        statusCode: 500,
      };
    }
    
    return {
      success: signatureResponse.data.success,
      message: signatureResponse.data.message,
      username: signatureResponse.data.username,
      data: signatureResponse.data.data,
    };
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const apiError = err.response?.data as IApiError | undefined;
      
      return {
        success: false,
        message: apiError?.message ?? "Unable to reach Cloudinary sign endpoint",
        statusCode: apiError?.statusCode ?? err.response?.status ?? 500,
      };
    }
    
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Unexpected error occurred",
      statusCode: 500,
    };
  }
};