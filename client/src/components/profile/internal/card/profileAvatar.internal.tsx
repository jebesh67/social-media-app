"use client";

import Image from "next/image";

export const ProfileAvatarInternal = ({url}: { url: string }) => {
  return (
    <div className={ "col-span-2 flex items-center" }>
      <Image
        className={ " rounded-full w-full aspect-square object-contain" }
        src={ url || "/assets/user-profile/defaultProfile.jpg" }
        alt="Default Profile"
        width={ 500 }
        height={ 500 }
        priority
      />
    </div>
  );
};
