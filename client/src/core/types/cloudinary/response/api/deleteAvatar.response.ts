import { DeleteAvatarType } from "@/core/types/cloudinary/deleteAvatar.type";

export interface IDeleteAvatarResponse {
  success: boolean;
  result: DeleteAvatarType;
}