"use client";

import Image from "next/image";
import clsx from "clsx";

export const ProfileAvatarInternal = ({url}: { url: string }) => {
  return (
    <Image
      className={ "col-span-2 rounded-full w-full aspect-square" }
      src={ clsx(!(url === "") || "/assets/user-profile/defaultProfile.jpg") }
      alt="Default Profile"
      width={ 500 }
      height={ 500 }
      objectFit="contain"
    />
  );
};
