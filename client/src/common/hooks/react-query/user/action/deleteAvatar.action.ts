import axios, { AxiosResponse } from "axios";
import { IDeleteAvatarResponse } from "@/types/cloudinary/response/api/deleteAvatar.response";

export const deleteAvatar = async (publicId: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<IDeleteAvatarResponse> = await axios.post("/api/cloudinary/delete-avatar", {
      publicId,
    });
    
    console.log("delete status", response);
    return response.data.success;
  } catch (err) {
    return false;
  }
};