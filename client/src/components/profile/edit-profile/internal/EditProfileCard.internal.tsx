"use client";

import { useState } from "react";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import clsx from "clsx";
import { CustomInputShared } from "@/components/shared/input/CustomInput.shared";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { ClientUser } from "@/types/user/user.type";
import {
  EditProfileAvatarInternal,
} from "@/components/profile/edit-profile/internal/EditProfileAvatar.internal";
import { useUpdateProfile } from "@/common/hooks/react-query/user/mutation/useUpdateProfile";
import { UseMutationResult } from "@tanstack/react-query";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";

type Props = {
  user: ClientUser;
}

export const EditProfileCardInternal = ({user}: Props) => {
  
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.bio);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
  const [avatarPublicId, setAvatarPublicId] = useState<string>(user.avatarPublicId);
  
  const {theme} = useThemeStore();
  
  const {refetch} = useUser();
  
  const router: AppRouterInstance = useRouter();
  
  const updateUserProfile: UseMutationResult<IUserApiResponse, Error, IUpdateProfileVariables> = useUpdateProfile();
  
  const handleEditProfile = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    updateUserProfile.mutate({name, bio, avatarUrl, avatarPublicId});
    
    await refetch();
    
    router.push("/profile");
  };
  
  return (
    <main className={ "w-full max-w-200 lg:max-w-160 flex justify-center css-transition px-4" }>
      <form className={
        clsx(
          "flex flex-col space-y-4 justify-center items-center w-full pb-8 pt-12 px-4 rounded-xl shadow-md",
          ifTheme(theme, "bg-zinc-700/40", "bg-zinc-400/40"),
        )
      }
            onSubmit={ handleEditProfile }
      >
        
        <h2>Edit profile</h2>
        
        <EditProfileAvatarInternal
          user={ user }
          onAvatarUrlChangeAction={ (url: string): void => setAvatarUrl(url) }
          onAvatarPublicIdChangeAction={ (id: string): void => setAvatarPublicId(id) }
        />
        
        <CustomInputShared
          id="updateName"
          value={ name }
          onChange={ (e): void => setName(e.target.value) }
          placeholder="Your Name"
          width={ "full" }
          isRequired={ false }
        />
        
        <CustomInputShared
          id="updateBio"
          isMultiLine={ true }
          value={ bio }
          onChange={ (e): void => setBio(e.target.value) }
          placeholder="Bio"
          width={ "full" }
          isRequired={ false }
        />
        
        <button
          className={
            clsx(
              "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
              
              ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
            )
          }
          type="submit"
        >
          Save changes
        </button>
      
      
      </form>
    </main>
  );
};
