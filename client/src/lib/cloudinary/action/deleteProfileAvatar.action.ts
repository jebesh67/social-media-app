import axios, { AxiosResponse } from "axios";
import { IDeleteAvatarResponse } from "@/types/cloudinary/response/api/deleteAvatar.response";

export const deleteProfileAvatar = async (avatarPublicId: string): Promise<string> => {
  try {
    const response: AxiosResponse<IDeleteAvatarResponse> = await axios.post("/api/cloudinary/delete-avatar", {
      publicId: avatarPublicId,
    });
    
    if (!response.data.success) {
      return "Unable to delete old avatar";
    }
    
    return "Old avatar successfully removed";
    
  } catch {
    return "Old avatar could not be deleted";
  }
};