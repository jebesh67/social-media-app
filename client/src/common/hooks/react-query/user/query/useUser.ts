"use client";

import { useQuery } from "@tanstack/react-query";
import { ClientUser } from "@/types/user/user.type";
import { fetchUserByUsername, fetchCurrentUser } from "@/common/hooks/react-query/user/action/fetchUser.action";

export const useUser = (username?: string) => {
  return useQuery<ClientUser | null>({
    queryKey: ["user", username ?? "CURRENT_USER"],
    
    queryFn: (): Promise<ClientUser | null> => (username ? fetchUserByUsername(username) : fetchCurrentUser()),
    
    staleTime: 1000 * 60 * 20,
    retry: false,
  });
};
