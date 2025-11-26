import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import axios, { AxiosResponse } from "axios";
import { ILogoutApiResponse } from "@/core/types/user/response/api/logoutApi.response";

export const logoutUserAction = async (): Promise<ILogoutApiResponse> => {
  try {
    const response: AxiosResponse<ILogoutApiResponse> = await axios.post("/api/user/logout");
    
    return response.data as ILogoutApiResponse;
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data as IApiError;
      
      throw new Error(errorResponse.message ?? "Something went wrong");
    }
    
    throw new Error("Something went wrong");
  }
};