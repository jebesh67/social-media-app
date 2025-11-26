import axios, { AxiosResponse } from "axios";
import { IDeleteAvatarResponse } from "@/core/types/cloudinary/response/api/deleteAvatar.response";

export const deleteAvatarAction = async (publicId: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<IDeleteAvatarResponse> = await axios.post("/api/cloudinary/delete-avatar", {
      publicId,
    });
    
    return response.data.success;
  } catch {
    return false;
  }
};