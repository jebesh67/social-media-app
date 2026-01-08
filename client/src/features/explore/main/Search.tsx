"use client";

import { useState } from "react";
import { SearchBar } from "@/features/explore/main/internal/search/SearchBar.internal";

export const Search = () => {
  const [showUsers, setShowUsers] = useState<boolean>(true);
  
  return (
    <div>
      <SearchBar />
    </div>
  );
};
