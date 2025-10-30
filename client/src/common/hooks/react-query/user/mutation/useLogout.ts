import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginVariables } from "@/common/hooks/react-query/user/type/loginVariables.interface";
import { ILogoutApiResponse } from "@/types/user/response/api/logoutApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { logoutUser } from "@/common/hooks/react-query/user/util/logoutUser.util";

export const useLogout = () => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<ILogoutApiResponse, Error>({
    
    mutationFn: async (): Promise<ILogoutApiResponse> => {
      
      const response: ILogoutApiResponse | IApiError = await logoutUser();
      console.log(response);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      const goodResponse = response as ILogoutApiResponse;
      
      queryClient.clear();
      
      return goodResponse;
    },
  });
};
