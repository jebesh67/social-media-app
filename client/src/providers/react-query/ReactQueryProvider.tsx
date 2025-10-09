import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

export const ReactQueryProvider = ({children}: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={ queryClient }>
      { children }
    </QueryClientProvider>
  );
};
