import { IApiError } from "@/types/error-response/api-error/apiError.response";
import axios, { AxiosResponse } from "axios";
import { ILogoutApiResponse } from "@/types/user/response/api/logoutApi.response";

export const logoutUser = async (): Promise<ILogoutApiResponse | IApiError> => {
  try {
    const response: AxiosResponse<ILogoutApiResponse | IApiError> = await axios.post("/api/user/logout");
    
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const backendData = err.response.data as IApiError;
      
      return {
        success: backendData.success ?? false,
        message: backendData.message ?? "Something went wrong",
        statusCode: backendData.statusCode ?? 500,
      };
    }
    
    return {
      success: false,
      message: "Oops something went wrong!",
      statusCode: 500,
    };
  }
};