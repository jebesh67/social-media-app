import axios, { AxiosResponse } from "axios";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";

export const updateProfile = async (data: IUpdateProfileVariables): Promise<IUserApiResponse | IApiError> => {
  try {
    console.log(data);
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.post("/api/user/update-profile", data);
    
    if (!response.data.success) {
      const errorResponse = response.data as IApiError;
      
      return {
        success: errorResponse.success ?? false,
        message: errorResponse.message ?? "Unable to update profile",
        statusCode: errorResponse.statusCode ?? 500,
      };
    }
    
    return response.data as IUserApiResponse;
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const backendData = err.response.data as IApiError;
      
      return {
        success: backendData.success ?? false,
        message: backendData.message ?? "Unable to update profile",
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