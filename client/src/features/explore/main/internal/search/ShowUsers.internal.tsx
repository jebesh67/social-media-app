"use client";

import { SearchUserType } from "@/core/types/user/searchUser.type";
import { useReadFromCache } from "@/core/hooks/helpers/useReadFromCache";
import { AvatarImage } from "@/features/shared/image/AvatarImage.shared";
import { useTheme } from "@/core/hooks/theme/useTheme";
import { clsx } from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { SearchStatus } from "@/core/types/tanstack/searchStatus.type";

export const ShowUsers = () => {
  const {data: users} = useReadFromCache<SearchUserType[]>(
    ["search-users"],
    [],
  );
  const {
    data: searchStatus = {
      isSearching: false,
      hasSearched: false,
    },
  } = useReadFromCache<SearchStatus>(["search-users", "meta"], {
    isSearching: false,
    hasSearched: false,
  });
  
  const [theme] = useTheme();
  
  return (
    <div className="css-card-width p-4 space-y-3">
      { searchStatus.isSearching && "searching..." }
      
      { !searchStatus.isSearching &&
        searchStatus.hasSearched &&
        (users && users.length === 0) &&
        "no users found"
      }
      
      {
        users && users.map((user: SearchUserType) => (
          <div key={ user.id }
               className={ clsx("grid grid-cols-12 gap-4 shadow-md p-2 hover:cursor-pointer hover:scale-103 css-transition rounded-md",
                 ifTheme(theme, "bg-zinc-900 hover:bg-zinc-800", "bg-gray-100 hover:bg-gray-200/50"),
               ) }>
            
            <div className={ "col-span-2" }>
              <AvatarImage src={ user.avatarUrl || "/assets/user-profile/defaultProfile.jpg" }
                           alt={ "avatar not found" }
                           width={ 500 }
                           height={ 500 }
                           className={ "rounded-full w-full aspect-square object-contain" }
              />
            </div>
            
            <div className={ "col-span-9 flex flex-col justify-center" }>
              <p className={ "leading-4 font-semibold text-base lg:text-lg" }>{ user.username }</p>
              <p className={ "font-light text-xs md:text-sm" }>{ user.name }</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};
