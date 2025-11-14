import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { ICreateUserVariables } from "@/common/hooks/react-query/user/type/createUserVariables.interface";
import { createUser } from "@/common/hooks/react-query/user/action/createUser.action";
import { CustomError } from "@/common/helper/error/customError.helper";

export const useCreateUser = (): UseMutationResult<IUserApiResponse, CustomError, ICreateUserVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, CustomError, ICreateUserVariables>({
    mutationFn: async ({
      name,
      username,
      email,
      password,
      confirmPassword,
    }: ICreateUserVariables): Promise<IUserApiResponse> => {
      const input: ICreateUserVariables = {name, username, email, password, confirmPassword};
      const response: IUserApiResponse = await createUser(input);
      
      if (!response.success) {
        throw new CustomError({message: response.message});
      }
      
      const goodResponse = response as IUserApiResponse;
      
      queryClient.setQueryData(["user", "CURRENT_USER"], goodResponse.user);
      return goodResponse;
    },
  });
};