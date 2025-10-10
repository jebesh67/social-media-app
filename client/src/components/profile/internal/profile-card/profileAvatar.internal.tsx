"use client";

import Image from "next/image";

export const ProfileAvatarInternal = ({url}: { url: string }) => {
  return (
    <Image
      className={ "col-span-2 rounded-full w-full aspect-square" }
      src={ url || "/assets/user-profile/defaultProfile.jpg" }
      alt="Default Profile"
      width={ 500 }
      height={ 500 }
      objectFit="contain"
    />
  );
};
