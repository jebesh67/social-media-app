"use client";

import { useState } from "react";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import clsx from "clsx";
import { CustomInput } from "@/features/shared/input/CustomInput";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { ClientUser } from "@/core/types/user/user.type";
import {
  EditProfileAvatar,
} from "@/features/profile/edit-profile/internal/EditProfileAvatar.internal";
import { useUpdateProfile } from "@/core/hooks/react-query/user/mutation/useUpdateProfile";
import { UseMutationResult } from "@tanstack/react-query";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { IUpdateProfileVariables } from "@/core/hooks/react-query/user/type/updateProfileVariables.interface";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useUser } from "@/core/hooks/react-query/user/query/useUser";
import { CustomSubmitButton } from "@/features/shared/button/CustomSubmitButton.shared";

type Props = {
  user: ClientUser;
}

export const EditProfileCard = ({user}: Props) => {
  
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.bio);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
  const [avatarPublicId, setAvatarPublicId] = useState<string>(user.avatarPublicId);
  
  const {theme} = useThemeStore();
  
  const {refetch} = useUser();
  
  const router: AppRouterInstance = useRouter();
  
  const updateUserProfileMutation: UseMutationResult<IUserApiResponse, Error, IUpdateProfileVariables> = useUpdateProfile();
  
  const handleEditProfile = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    updateUserProfileMutation.mutate({name, bio, avatarUrl, avatarPublicId});
    
    await refetch();
    
    router.push("/profile");
  };
  
  return (
    <main className={ "css-card-width flex justify-center css-transition px-4" }>
      <form className={
        clsx(
          "flex flex-col space-y-4 justify-center items-center w-full pb-8 pt-12 px-4 rounded-xl shadow-md",
          ifTheme(theme, "css-dark-container", "css-light-container"),
        )
      }
            onSubmit={ handleEditProfile }
      >
        
        <h2>Edit profile</h2>
        
        <EditProfileAvatar
          user={ user }
          onAvatarUrlChangeAction={ (url: string): void => setAvatarUrl(url) }
          onAvatarPublicIdChangeAction={ (id: string): void => setAvatarPublicId(id) }
        />
        
        <CustomInput
          id="updateName"
          value={ name }
          onChange={ (e): void => setName(e.target.value) }
          placeholder="Your Name"
          width={ "full" }
          isRequired={ false }
        />
        
        <CustomInput
          id="updateBio"
          isMultiLine={ true }
          value={ bio }
          onChange={ (e): void => setBio(e.target.value) }
          placeholder="Bio"
          width={ "full" }
          isRequired={ false }
        />
        
        <CustomSubmitButton
          text={ "Save changes" }
          pendingText={ "Saving..." }
          isPending={ updateUserProfileMutation.isPending }
        />
      
      </form>
    </main>
  );
};
