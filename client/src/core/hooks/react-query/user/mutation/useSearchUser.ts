import { searchUsersAction } from "@/core/hooks/react-query/user/action/searchUsers.action";
import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { SearchUserType } from "@/core/types/user/searchUser.type";
import { SearchStatus } from "@/core/types/tanstack/searchStatus.type";

export const useSearchUser = (): UseMutationResult<
  SearchUserType[] | undefined,
  Error,
  string
> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["search-users"],
    mutationFn: searchUsersAction,
    
    onMutate: (username: string): void => {
      if (!username.trim()) return;
      
      queryClient.setQueryData<SearchStatus>(
        ["search-users", "meta"],
        {
          isSearching: true,
          hasSearched: false,
        },
      );
    },
    
    onSuccess: (data: SearchUserType[] | undefined): void => {
      queryClient.setQueryData(["search-users"], data ?? []);
    },
    
    onSettled: (): void => {
      queryClient.setQueryData<SearchStatus>(
        ["search-users", "meta"],
        (prev: SearchStatus | undefined): SearchStatus => ({
          ...prev,
          isSearching: false,
          hasSearched: true,
        }),
      );
    },
  });
};
