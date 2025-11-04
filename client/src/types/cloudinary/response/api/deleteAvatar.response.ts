import { DeleteAvatarType } from "@/types/cloudinary/deleteAvatar.type";

export interface IDeleteAvatarResponse {
  success: boolean;
  result: DeleteAvatarType;
}