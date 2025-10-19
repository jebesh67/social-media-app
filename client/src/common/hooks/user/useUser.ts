"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user/user.type";
import { fetchUser, fetchCurrentUser } from "@/common/hooks/user/services/fetchUser.helper";

export const useUser = (username?: string) => {
  return useQuery<User | null>({
    queryKey: ["user", username ?? "current"],
    queryFn: () => (username ? fetchUser(username) : fetchCurrentUser()),
    staleTime: 1000 * 60 * 20,
    retry: false,
    enabled: true,
  });
};
