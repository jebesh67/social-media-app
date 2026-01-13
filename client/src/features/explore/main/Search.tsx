"use client";

import { SearchBar } from "@/features/explore/main/internal/search/SearchBar.internal";
import { ShowUsers } from "@/features/explore/main/internal/search/ShowUsers.internal";

export const Search = () => {
  
  return (
    <div>
      <SearchBar />
      <ShowUsers />
    </div>
  );
};
