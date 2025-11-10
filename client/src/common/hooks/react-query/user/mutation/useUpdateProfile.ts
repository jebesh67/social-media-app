import { QueryClient, useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/common/hooks/react-query/user/util/updateProfile.util";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";

export const useUpdateProfile = (): UseMutationResult<IUserApiResponse, Error, IUpdateProfileVariables> => {
  const queryClient: QueryClient = useQueryClient();
  
  return useMutation<IUserApiResponse, Error, IUpdateProfileVariables>({
    mutationFn: async ({name, bio, avatarUrl, avatarPublicId}: IUpdateProfileVariables) => {
      const response: IUserApiResponse = await updateProfile({name, bio, avatarUrl, avatarPublicId});
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      const goodResponse = response as IUserApiResponse;
      
      queryClient.setQueryData(["user", "CURRENT_USER"], goodResponse.user);
      return goodResponse;
    },
  });
};