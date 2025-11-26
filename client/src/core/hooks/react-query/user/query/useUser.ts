"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ClientUser } from "@/core/types/user/user.type";
import { fetchCurrentUserAction } from "@/core/hooks/react-query/user/action/fetchCurrentUser.action";
import { fetchUserByUsernameAction } from "@/core/hooks/react-query/user/action/fetchUserByUsername.action";

export const useUser = (username?: string): UseQueryResult<ClientUser | null> => {
  return useQuery<ClientUser | null>({
    queryKey: ["user", username ?? "CURRENT_USER"],
    
    queryFn: (): Promise<ClientUser | null> => (username ? fetchUserByUsernameAction(username) : fetchCurrentUserAction()),
    
    staleTime: 1000 * 60 * 20,
    retry: false,
  });
};
