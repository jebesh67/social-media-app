"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({children}: { children: ReactNode }) => {
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

export default ReactQueryProvider;