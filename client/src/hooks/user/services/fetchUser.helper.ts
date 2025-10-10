import axios, { AxiosResponse } from "axios";
import { User } from "@/types/user/user.type";
import { IUserApiResponse } from "@/types/user/getUser.response";
import { IApiError } from "@/types/response/global-error/error.response";

export const fetchUser = async (username: string): Promise<User | null> => {
  try {
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/user/get/${ username }`, {
      withCredentials: true,
    });
    
    if (!response.data.success) {
      console.warn("Backend error:", response.data.message);
      return null;
    }
    
    const userData = response.data as IUserApiResponse;
    
    return userData.user as User || null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) return null;
      if (err.response?.status === 401) {
        console.warn("Unauthorized: token might be missing or expired");
        return null;
      }
    }
    
    console.error("Unexpected error fetching user:", err);
    throw err;
  }
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.get(
      `/api/user/current-user`,
      {withCredentials: true},
    );
    
    if (!response.data.success) {
      console.warn("Backend error:", response.data.message);
      return null;
    }
    
    const userData = response.data as IUserApiResponse;
    
    return userData.user as User || null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) return null;
      if (err.response?.status === 401) {
        console.warn("Unauthorized: token might be missing or expired");
        return null;
      }
    }
    
    console.error("Unexpected error fetching user:", err);
    throw err;
  }
};

