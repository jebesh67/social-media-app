"use client";

import clsx from "clsx";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { useRef, useState, RefObject } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Dialog } from "@headlessui/react";
import axios, { AxiosResponse } from "axios";
import { BarLoader } from "react-spinners";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ClientUser } from "@/types/user/user.type";
import { CloudinaryUploadResponse } from "@/types/cloudinary/response/api/cloudinaryUpload.response";
import { getCroppedImg } from "@/components/edit-profile/helper/getCroppedImg.helper";
import { signCloudinaryHelper } from "@/components/edit-profile/helper/signCloudinary.helper";
import { ISignCloudinaryResponse } from "@/types/cloudinary/response/api/ISIgnCloudinary.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { deleteProfileAvatar } from "@/lib/cloudinary/util/deleteProfileAvatar.util";

type Props = {
  user: ClientUser;
  onAvatarChangeAction?: (url: string) => void;
  oldAvatarUrl: string;
  oldAvatarPublicId: string;
};

export const EditProfileAvatarInternal = ({user, onAvatarChangeAction, oldAvatarUrl, oldAvatarPublicId}: Props) => {
  const {theme} = useThemeStore();
  
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatarUrl);
  const [uploading, setUploading] = useState(false);
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null);
  
  const [cropModal, setCropModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  
  const onCropComplete = (_: Area, croppedAreaPixels: Area): void => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  
  const handleFileSelect = (): void | undefined => fileInputRef.current?.click();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setCropModal(true);
  };
  
  const handleCropConfirm = async (): Promise<void> => {
    if (!selectedFile || !croppedAreaPixels) return;
    const croppedBlob: Blob = await getCroppedImg(
      URL.createObjectURL(selectedFile),
      croppedAreaPixels,
    );
    const croppedFile = new File([croppedBlob], selectedFile.name, {
      type: selectedFile.type,
    });
    await uploadToCloudinary(croppedFile);
    setCropModal(false);
  };
  
  const uploadToCloudinary = async (file: File): Promise<void> => {
    try {
      setUploading(true);
      
      const signatureResponse: ISignCloudinaryResponse | IApiError = await signCloudinaryHelper();
      
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
      );
      
      const data: CloudinaryUploadResponse = cloudRes.data;
      console.log(data.public_id);
      
      if (data.secure_url) {
        const deleteAvatarResponse: string = await deleteProfileAvatar((oldAvatarPublicId));
        console.log(deleteAvatarResponse);
        
        setAvatarPreview(data.secure_url);
        onAvatarChangeAction?.(data.secure_url);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <>
      <section
        className={ clsx(
          "grid grid-cols-10 w-full py-2 rounded-xl",
          ifTheme(theme, "bg-zinc-800", "bg-zinc-300"),
        ) }
      >
        <div className="relative col-span-3 p-2 flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-30">
            <Image
              className="rounded-full shadow-md object-contain hover:cursor-pointer hover:scale-102"
              src={ avatarPreview || "/assets/user-profile/defaultProfile.jpg" }
              alt={ user.name }
              width={ 500 }
              height={ 500 }
              onClick={ handleFileSelect }
              priority={ true }
            />
            
            <button
              className={ clsx(
                "absolute bottom-1 right-1 rounded-md p-1 hover:cursor-pointer shadow-sm",
                ifTheme(
                  theme,
                  "bg-zinc-700 hover:bg-zinc-600",
                  "bg-zinc-200 hover:bg-zinc-100",
                ),
              ) }
              type="button"
              onClick={ handleFileSelect }
            >
              { uploading ? (
                <span className="text-xs px-2">
                  <BarLoader color="#007dff" />
                </span>
              ) : (
                <FaImage />
              ) }
            </button>
          </div>
          
          <input
            ref={ fileInputRef }
            type="file"
            accept="image/*"
            className="hidden"
            onChange={ handleFileChange }
          />
        </div>
        
        <div className="col-span-4 flex flex-col justify-center px-2">
          <p className="text-base font-semibold">{ user.username }</p>
          <p className="text-sm font-light">{ user.name }</p>
        </div>
      </section>
      
      <Dialog
        open={ cropModal }
        onClose={ () => setCropModal(false) }
        className="fixed inset-0 flex justify-center items-center z-50 px-4 bg-black/20 backdrop-blur-xs"
      >
        
        <div className={ clsx(
          "relative w-full max-w-120 lg:max-w-140 rounded-xl overflow-hidden shadow-md p-4",
          ifTheme(theme, "bg-zinc-800", "bg-zinc-300"),
        ) }>
          <div className="relative w-full aspect-square">
            { selectedFile && (
              <Cropper
                image={ URL.createObjectURL(selectedFile) }
                crop={ crop }
                zoom={ zoom }
                aspect={ 1 }
                onCropChange={ setCrop }
                onZoomChange={ setZoom }
                onCropComplete={ onCropComplete }
              />
            ) }
          </div>
          
          <div className="flex justify-end p-4 space-x-3">
            <button
              className={ clsx(
                "px-4 py-2 rounded-md font-semibold text-sm hover:cursor-pointer",
                ifTheme(theme, "bg-red-800 hover:bg-red-700", "bg-red-500 hover:bg-red-600"),
                uploading && "opacity-60",
              ) }
              onClick={ (): void => setCropModal(false) }
              disabled={ uploading }
            >
              Cancel
            </button>
            <button
              className={ clsx(
                "px-4 py-2 rounded-md font-semibold text-sm hover:cursor-pointer",
                ifTheme(theme, "bg-blue-800 hover:bg-blue-700", "bg-blue-500 hover:bg-blue-600"),
                uploading && "opacity-60",
              ) }
              onClick={ handleCropConfirm }
              disabled={ uploading }
            >
              {
                uploading ? "Uploading" : "Upload"
              }
            </button>
          </div>
        
        </div>
      </Dialog>
    </>
  );
};