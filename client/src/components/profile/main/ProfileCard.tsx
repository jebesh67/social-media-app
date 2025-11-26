"use client";

import { useUser } from "@/common/hooks/react-query/user/query/useUser";
import { ProfileInfo } from "@/components/profile/main/internal/card/profileInfo.internal";
import { ProfileAvatar } from "@/components/profile/main/internal/card/profileAvatar.internal";
import { ClientGridLoader } from "@/components/shared/loader/ClientGridLoader.shared";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { ProfileBio } from "@/components/profile/main/internal/card/profileBio.internal";
import { ProfileCardButton } from "@/components/profile/main/internal/card/profileCardButton.internal";

export const ProfileCard = () => {
  const {data: currentUser, isLoading} = useUser();
  const {theme} = useThemeStore();
  
  return (
    <main className={ "px-4 w-full flex justify-center items-center" }>
      <div
        className={ clsx(
          "grid grid-cols-10 css-card-width p-6 rounded-lg shadow-md select-none",
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
                <ProfileAvatar url={ currentUser.avatarUrl } />
                <ProfileInfo currentUser={ currentUser } />
                <ProfileBio currentUser={ currentUser } />
                <ProfileCardButton />
              </>
            )
          )
        }
      </div>
    </main>
  
  );
};
