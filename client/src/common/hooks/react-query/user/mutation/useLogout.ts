import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { ILogoutApiResponse } from "@/types/user/response/api/logoutApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { logoutUser } from "@/common/hooks/react-query/user/util/logoutUser.util";

export const useLogout = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<ILogoutApiResponse, Error>({
    
    mutationFn: async (): Promise<ILogoutApiResponse> => {
      
      const response: ILogoutApiResponse | IApiError = await logoutUser();
      
      queryClient.clear();
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response as ILogoutApiResponse;
    },
  });
};
