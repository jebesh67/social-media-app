import { createImage } from "@/components/edit-profile/helper/createImage.helper";
import { PixelCropType } from "@/types/react-easy-crop/pixelCrop.type";

export const getCroppedImg = async (imageSrc: string, pixelCrop: PixelCropType): Promise<Blob> => {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  
  ctx?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );
  
  return new Promise((resolve): void => {
    canvas.toBlob((blob: Blob | null): void => resolve(blob as Blob), "image/jpeg");
  });
};