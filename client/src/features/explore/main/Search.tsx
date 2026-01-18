"use client";

import { SearchBar } from "@/features/explore/main/internal/search/SearchBar.internal";
import { ShowUsers } from "@/features/explore/main/internal/search/ShowUsers.internal";
import { useState } from "react";

export const Search = () => {
  const [showUsers, setShowUsers] = useState<boolean>(false);
  
  return (
    <div>
      <SearchBar setShowUserAction={ setShowUsers } />
      
      { showUsers &&
        <div className={ "flex flex-col items-center" }>
          <ShowUsers />
        </div>
      }
    </div>
  );
};
