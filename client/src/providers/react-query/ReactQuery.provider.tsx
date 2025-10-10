"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

export const ReactQueryProvider = ({children}: { children: ReactNode }) => {
  const [queryClient] = useState(
    (): QueryClient =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 20,
            retry: false,
          },
        },
      }),
  );
  
  
  return (
    <QueryClientProvider client={ queryClient }>
      { children }
    </QueryClientProvider>
  );
};
