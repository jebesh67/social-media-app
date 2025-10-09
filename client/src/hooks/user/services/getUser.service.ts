import axios, { AxiosError } from "axios";
import { User } from "@/types/user/user.type";

export const fetchUser = async (username: string): Promise<User | null> => {
  try {
    const {data} = await axios.get(`${ process.env.NEXT_PUBLIC_API_URL }/api/user/${ username }`, {
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
    const {data} = await axios.get(`/api/user`, {
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

