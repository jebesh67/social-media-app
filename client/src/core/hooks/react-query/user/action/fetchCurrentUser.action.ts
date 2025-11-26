import axios, { AxiosResponse } from "axios";
import { ClientUser } from "@/core/types/user/user.type";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";

export const fetchCurrentUserAction = async (): Promise<ClientUser | null> => {
  try {
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.get(
      `/api/user/current-user`,
    );
    
    if (!response.data.success) {
      const errorResponse = response.data as IApiError;
      
      console.warn("Backend error:", errorResponse.message, errorResponse.statusCode);
      return null;
    }
    
    const userData = response.data as IUserApiResponse;
    
    return userData.user;
  } catch (err) {
    
    console.warn("Error connecting to /api/user/current-user:", err);
    return null;
  }
};

