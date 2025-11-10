import axios, { AxiosResponse } from "axios";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";

export const updateProfile = async (data: IUpdateProfileVariables): Promise<IUserApiResponse> => {
  try {
    const response: AxiosResponse<IUserApiResponse> = await axios.post("/api/user/update-profile", data);
    
    return response.data as IUserApiResponse;
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data as IApiError;
      
      throw new Error(errorResponse.message ?? "Something went wrong");
    }
    
    throw new Error("Something went wrong");
  }
};