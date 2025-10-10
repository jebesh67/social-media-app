"use client";

import { ProfileHeaderInternal } from "@/components/profile/services/header/ProfileHeader.internal";

export const ProfileHeader = () => {
  return (
    <header className={ "fixed top-0 w-full flex justify-center select-none" }>
      <ProfileHeaderInternal />
    </header>
  );
};
