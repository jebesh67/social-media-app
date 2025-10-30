"use client";

import { ProfileHeaderInternal } from "@/components/profile/internal/header/ProfileHeader.internal";

export const ProfileHeader = () => {
  
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none z-40" }>
      <ProfileHeaderInternal />
    </header>
  );
};
