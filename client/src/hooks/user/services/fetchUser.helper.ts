import axios from "axios";
import { User } from "@/types/user/user.type";
import { IUserRouteResponse } from "@/types/user/getUser.response";

export const fetchUser = async (username: string): Promise<User | null> => {
  try {
    const {data} = await axios.get<User>(`${ process.env.NEXT_PUBLIC_API_URL }/user/get/${ username }`, {
      withCredentials: true,
    });
    return data;
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
    const response = await axios.get<IUserRouteResponse>(`/api/user/current-user`, {
      withCredentials: true,
    });
    
    return response.data.user;
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

