import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { updateProfileAction } from "@/core/hooks/react-query/user/action/updateProfile.action";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { IUpdateProfileVariables } from "@/core/hooks/react-query/user/type/updateProfileVariables.interface";

export const useUpdateProfile = (): UseMutationResult<IUserApiResponse, Error, IUpdateProfileVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, IUpdateProfileVariables>({
    mutationFn: async ({name, bio, avatarUrl, avatarPublicId}: IUpdateProfileVariables): Promise<IUserApiResponse> => {
      const response: IUserApiResponse = await updateProfileAction({name, bio, avatarUrl, avatarPublicId});
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      queryClient.setQueryData(["user", "CURRENT_USER"], response.user);
      return response as IUserApiResponse;
    },
  });
};