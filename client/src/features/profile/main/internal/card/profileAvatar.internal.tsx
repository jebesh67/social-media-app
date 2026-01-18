"use client";

import { AvatarImage } from "@/features/shared/image/AvatarImage.shared";

export const ProfileAvatar = ({url}: { url: string }) => {
  const isLocal: boolean = !url || url.startsWith("/");
  
  return (
    <div className={ "col-span-2 flex items-center" }>
      <AvatarImage
        className={ "rounded-full w-full aspect-square object-contain" }
        src={ url || "/assets/user-profile/defaultProfile.jpg" }
        alt="Default Profile"
        width={ 500 }
        height={ 500 }
        unoptimized={ isLocal }
      />
    </div>
  );
};
