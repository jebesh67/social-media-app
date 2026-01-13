import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
  
} from "@tanstack/react-query";
import { searchUsersAction } from "@/core/hooks/react-query/user/action/searchUsers.action";
import { SearchUserType } from "@/core/types/user/searchUser.type";

export const useSearchUser = (): UseMutationResult<SearchUserType[], Error, string> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<SearchUserType[], Error, string>({
      mutationKey: ["search-users"],
      mutationFn: async (username: string): Promise<SearchUserType[]> => {
        if (!username.trim()) {
          queryClient.setQueryData<SearchUserType[]>(["search-users"], []);
          return [];
        }
        
        return searchUsersAction(username);
      },
      onSuccess(data: SearchUserType[]): void {
        queryClient.setQueryData(["search-users"], data);
      },
    },
  );
};