"use client";

import { useUser } from "@/hooks/user/useUser";
import { ProfileInfoInternal } from "@/components/profile/services/profile-card/profileInfo.internal";
import { ProfileAvatarInternal } from "@/components/profile/services/profile-card/profileAvatar.internal";
import { ClientGridLoader } from "@/components/common/loader/ClientGridLoader.shared";


export const ProfileCard = () => {
  const {data: currentUser, isLoading, isFetched} = useUser();
  
  return (
    <div className={ "grid grid-cols-10 max-w-200 px-6" }>
      {
        isLoading ? (
          <div className={ "col-span-10 p-3 flex items-center justify-center" }>
            <ClientGridLoader
              color="#3b94e6"
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
