"use client";

import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {
  src: string;
}

export const AvatarImage = ({src, ...props}: Props) => {
  const isLocal: boolean = src.startsWith("/");
  
  return (
    <Image
      { ...props }
      src={ src }
      priority
      unoptimized={ isLocal }
    />
  );
};
