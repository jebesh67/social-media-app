"use client";

import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { EditProfileCard } from "@/components/profile/edit-profile/internal/EditProfileCard";
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
          (isFetched && user) && <EditProfileCard user={ user } />
        }
        
        {
          (isFetched && !user) && (<div>user not found!</div>)
        }
      
      </main>
    </>
  );
};
