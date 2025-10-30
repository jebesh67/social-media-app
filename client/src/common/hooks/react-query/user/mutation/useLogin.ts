import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/common/hooks/react-query/user/util/loginUser.util";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { ILoginVariables } from "@/common/hooks/react-query/user/type/loginVariables.interface";

export const useLogin = (): UseMutationResult<IUserApiResponse, Error, ILoginVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, ILoginVariables, unknown>({
    mutationFn: async ({username, password}: ILoginVariables): Promise<IUserApiResponse> => {
      const response: IUserApiResponse | IApiError = await loginUser(username, password);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      const goodResponse = response as IUserApiResponse;
      
      queryClient.setQueryData(["user", "CURRENT_USER"], goodResponse.user);
      return goodResponse;
    }
    ,
  });
};