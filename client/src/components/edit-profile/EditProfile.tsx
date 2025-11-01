"use client";

import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { EditProfileCardInternal } from "@/components/edit-profile/internal/EditProfileCard.internal";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";

export const EditProfile = () => {
  const {data: user, isPending, isFetched} = useUser();
  
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Edit profile" }
      />
      
      <main className={ "flex justify-center" }>
        
        {
          (isPending && !isFetched) && (<div>Loading...</div>)
        }
        
        {
          (isFetched && user) && <EditProfileCardInternal user={ user } />
        }
        
        {
          (isFetched && !user) && (<div>user not found!</div>)
        }
      
      </main>
    </>
  );
};
