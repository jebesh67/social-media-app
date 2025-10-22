import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/common/hooks/user/util/loginUser.util";
import { IUserApiResponse } from "@/types/user/response/userApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { User } from "@/types/user/user.type";
import { ILoginVariables } from "@/common/hooks/user/type/loginVariables.interface";

export const useLogin = (): UseMutationResult<User, Error, ILoginVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<User, Error, ILoginVariables, unknown>({
    mutationFn: async ({username, password}: { username: string; password: string }): Promise<User> => {
      const response: IUserApiResponse | IApiError = await loginUser(username, password);
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      const goodResponse = response as IUserApiResponse;
      
      queryClient.setQueryData(["user", "CURRENT_USER"], goodResponse.user);
      return goodResponse.user;
    }
    ,
  });
};