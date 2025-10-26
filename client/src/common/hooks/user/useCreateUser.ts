import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { IUserApiResponse } from "@/types/user/response/userApi.response";
import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { ICreateUserVariables } from "@/common/hooks/user/type/createUserVariables.interface";
import { createUser } from "@/common/hooks/user/util/createUser.util";

export const useCreateUser = (): UseMutationResult<IUserApiResponse, Error, ICreateUserVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, ICreateUserVariables, unknown>({
    mutationFn: async ({name, username, email, password}: ICreateUserVariables): Promise<IUserApiResponse> => {
      const response: IUserApiResponse | IApiError = await createUser(name, username, email, password);
      
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