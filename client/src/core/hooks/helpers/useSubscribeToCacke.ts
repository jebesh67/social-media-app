import { QueryClient, QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSubscribeToCache = <T, >(
  queryKey: QueryKey,
  fallback: T,
) => {
  const queryClient: QueryClient = useQueryClient();
  
  return useQuery<T>({
    queryKey,
    queryFn: (): T =>
      queryClient.getQueryData<T>(queryKey) ?? fallback,
  });
};

export class useSubscribeToCacke {
}