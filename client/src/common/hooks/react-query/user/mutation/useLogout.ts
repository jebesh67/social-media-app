import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ILogoutApiResponse } from "@/types/user/response/api/logoutApi.response";
import { logoutUser } from "@/common/hooks/react-query/user/action/logoutUser.action";

export const useLogout = (): UseMutationResult<ILogoutApiResponse, Error, void, unknown> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<ILogoutApiResponse, Error>({
    
    mutationFn: async (): Promise<ILogoutApiResponse> => {
      
      const response: ILogoutApiResponse = await logoutUser();
      
      queryClient.clear();
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response as ILogoutApiResponse;
    },
  });
};
