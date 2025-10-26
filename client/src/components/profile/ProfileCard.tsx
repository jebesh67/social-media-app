"use client";

import { useUser } from "@/common/hooks/user/useUser";
import { ProfileInfoInternal } from "@/components/profile/internal/profile-card/profileInfo.internal";
import { ProfileAvatarInternal } from "@/components/profile/internal/profile-card/profileAvatar.internal";
import { ClientGridLoader } from "@/components/shared/loader/ClientGridLoader.shared";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { ProfileBioInternal } from "@/components/profile/internal/profile-card/profileBio.internal";
import { ProfileCardButtonInternal } from "@/components/profile/internal/profile-card/profileCardButton.internal";


export const ProfileCard = () => {
  const {data: currentUser, isLoading} = useUser();
  const {theme} = useThemeStore();
  
  return (
    <main className={ "px-4 w-full flex justify-center items-center" }>
      <div
        className={ clsx(
          "grid grid-cols-10 max-w-200 lg:max-w-160 w-full p-6 rounded-lg shadow-md select-none",
          ifTheme(theme, "css-dark-container", "css-light-container"))
        }
      >
        {
          isLoading ? (
            <div className={ "col-span-10 p-3 flex items-center justify-center w-full" }>
              <ClientGridLoader
                color={ ifTheme(theme, "#4c4c4c", "#ababab") }
              />
            </div>
          ) : (
            (!isLoading && currentUser) && (
              <>
                <ProfileAvatarInternal url={ currentUser.avatar } />
                <ProfileInfoInternal currentUser={ currentUser } />
                <ProfileBioInternal currentUser={ currentUser } />
                <ProfileCardButtonInternal />
              </>
            )
          )
        }
      </div>
    </main>
  
  );
};
