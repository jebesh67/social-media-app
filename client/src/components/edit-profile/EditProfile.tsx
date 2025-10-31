"use client";

import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { EditProfileCardInternal } from "@/components/edit-profile/internal/EditProfileCard.internal";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";

export const EditProfile = () => {
  const {data: user, isPending} = useUser();
  
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Edit profile" }
      />
      
      {
        (!isPending && user) && <EditProfileCardInternal user={ user } />
      }
      
      {
        !user && (<div>user not found!</div>)
      }
    
    </>
  );
};
