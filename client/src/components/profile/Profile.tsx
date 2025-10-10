"use client";

import { useThemeStore } from "@/stores/theme/themeStore";
import { ProfileCard } from "@/components/profile/ProfileCard";

export const Profile = () => {
  
  return (
    <div className={ "css-body-top-padding w-full flex justify-center" }>
      <ProfileCard />
    </div>
  );
};
