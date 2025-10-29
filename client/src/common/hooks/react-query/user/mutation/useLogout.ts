import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {method: "POST"});
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: async () => {
      queryClient.clear();
    },
  });
};
