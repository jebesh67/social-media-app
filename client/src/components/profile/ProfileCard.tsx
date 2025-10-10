"use client";

import { useUser } from "@/hooks/user/useUser";
import { ProfileInfoInternal } from "@/components/profile/services/profile-card/profileInfo.internal";
import { ProfileAvatarInternal } from "@/components/profile/services/profile-card/profileAvatar.internal";
import { ClientGridLoader } from "@/components/common/loader/ClientGridLoader.shared";
import { useThemeStore } from "@/stores/theme/themeStore";
import clsx from "clsx";
import { ifTheme } from "@/utils/theme/theme.internal";


export const ProfileCard = () => {
  const {data: currentUser, isLoading, isFetched} = useUser();
  const {theme} = useThemeStore();
  
  return (
    <div
      className={ clsx(
        "grid grid-cols-10 max-w-200 mx-4 p-6 rounded-lg shadow-md select-none",
        ifTheme(theme, "css-dark-container", "css-light-container"))
      }
    >
      {
        isLoading ? (
          <div className={ "col-span-10 p-3 flex items-center justify-center" }>
            <ClientGridLoader
              color={ clsx(ifTheme(theme, "#4c4c4c", "#ababab")) }
            />
          </div>
        ) : (
          (isFetched && currentUser) && (
            <>
              <ProfileAvatarInternal url={ currentUser.avatar } />
              <ProfileInfoInternal currentUser={ currentUser } />
            </>
          )
        )
      }
    </div>
  );
};
