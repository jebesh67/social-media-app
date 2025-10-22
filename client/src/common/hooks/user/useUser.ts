"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user/user.type";
import { fetchUserByUsername, fetchCurrentUser } from "@/common/hooks/user/util/fetchUser.util";

export const useUser = (username?: string) => {
  return useQuery<User | null>({
    queryKey: ["user", username ?? "CURRENT_USER"],
    queryFn: (): Promise<User | null> => (username ? fetchUserByUsername(username) : fetchCurrentUser()),
    staleTime: 1000 * 60 * 20,
    retry: false,
  });
};
