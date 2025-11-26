import { ClientUser } from "@/core/types/user/user.type";
import axios, { AxiosResponse } from "axios";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { IApiError } from "@/core/types/error/api-error/response/apiError.response";

export const fetchUserByUsernameAction = async (username: string): Promise<ClientUser | null> => {
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