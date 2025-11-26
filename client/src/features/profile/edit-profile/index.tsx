"use client";

import { CustomHeader } from "@/features/shared/header/CustomHeader.shared";
import { EditProfileCard } from "@/features/profile/edit-profile/internal/EditProfileCard";
import { useUser } from "@/core/hooks/react-query/user/query/useUser";

const EditProfile = () => {
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

export default EditProfile;