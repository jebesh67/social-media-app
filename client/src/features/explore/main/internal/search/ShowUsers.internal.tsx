"use client";

import { SearchUserType } from "@/core/types/user/searchUser.type";
import { useSubscribeToCache } from "@/core/hooks/helpers/useSubscribeToCacke";

export const ShowUsers = () => {
  const {data: users} = useSubscribeToCache<SearchUserType[]>(
    ["search-users"],
    [],
  );
  
  return (
    <div className="p-7 bg-red-400 text-black">
      { (users && users.length > 0) && users[0].id }
    </div>
  );
};
