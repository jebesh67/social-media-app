import { ISignCloudinaryResponse } from "@/types/cloudinary/response/api/ISIgnCloudinary.response";
import { IApiError } from "@/types/error/api-error/response/apiError.response";
import { signCloudinaryAction } from "@/components/edit-profile/action/signCloudinary.action";
import axios, { AxiosProgressEvent, AxiosResponse } from "axios";
import { CloudinaryUploadResponse } from "@/types/cloudinary/response/api/cloudinaryUpload.response";

export const uploadAvatarAction = async (
  file: File,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryUploadResponse> => {
  const signatureResponse: ISignCloudinaryResponse | IApiError = await signCloudinaryAction();
  
  if (!signatureResponse.success) throw new Error(signatureResponse.message);
  
  const goodResponse = signatureResponse as ISignCloudinaryResponse;
  const {timestamp, signature, cloudName, apiKey, uploadPreset} = goodResponse.data;
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("upload_preset", uploadPreset);
  
  const cloudRes: AxiosResponse<CloudinaryUploadResponse> = await axios.post(
    `https://api.cloudinary.com/v1_1/${ cloudName }/image/upload`,
    formData,
    {
      onUploadProgress: (progressEvent: AxiosProgressEvent): void => {
        if (!onProgress) return;
        const percent: number = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1),
        );
        onProgress(percent);
      },
    },
  );
  
  return cloudRes.data as CloudinaryUploadResponse;
};
