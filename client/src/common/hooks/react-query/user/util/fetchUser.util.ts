import axios, { AxiosResponse } from "axios";
import { User } from "@/types/user/user.type";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";

export const fetchUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/user/get/${ username }`);
    
    if (!response.data.success) {
      const errorResponse = response.data as IApiError;
      
      console.warn("Backend error:", errorResponse.message, errorResponse.statusCode);
      return null;
    }
    
    const userData = response.data as IUserApiResponse;
    
    return userData.user;
  } catch (err) {
    console.warn("Error connecting to /api/user/other-user:", err);
    return null;
  }
};

export const fetchCurrentUser = async (): Promise<User | null> => {
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

