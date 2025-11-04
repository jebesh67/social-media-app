import { SignCloudinaryType } from "@/types/cloudinary/signCloudinary.type";

export interface ISignCloudinaryResponse {
  success: boolean;
  message: string;
  username: string;
  data: SignCloudinaryType;
}