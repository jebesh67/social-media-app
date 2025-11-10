import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { ICreateUserVariables } from "@/common/hooks/react-query/user/type/createUserVariables.interface";
import { createUser } from "@/common/hooks/react-query/user/action/createUser.action";

export const useCreateUser = (): UseMutationResult<IUserApiResponse, Error, ICreateUserVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, ICreateUserVariables>({
    mutationFn: async ({name, username, email, password}: ICreateUserVariables): Promise<IUserApiResponse> => {
      const response: IUserApiResponse = await createUser(name, username, email, password);
      
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