import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/common/hooks/react-query/user/action/updateProfile.action";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";

export const useUpdateProfile = (): UseMutationResult<IUserApiResponse, Error, IUpdateProfileVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, IUpdateProfileVariables>({
    mutationFn: async ({name, bio, avatarUrl, avatarPublicId}: IUpdateProfileVariables): Promise<IUserApiResponse> => {
      const response: IUserApiResponse = await updateProfile({name, bio, avatarUrl, avatarPublicId});
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return response as IUserApiResponse;
    },
    
    onSuccess: (res: IUserApiResponse): void => {
      queryClient.setQueryData(["user", "CURRENT_USER"], res.user);
    },
  });
};