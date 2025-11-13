"use client";

import { useEffect, useState } from "react";
import ThemeProvider from "@/common/providers/theme/ThemeProvider";
import { ReactQueryProvider } from "@/common/providers/react-query/ReactQuery.provider";
import { Navigation } from "@/components/navigation/Navigation";
import { Theme } from "@/common/utils/theme/types/theme.types";
import { PageLoader } from "@/components/shared/loader/PageLoader";

type Props = {
  children: React.ReactNode;
}

export default function ClientAppShell({
  children,
}: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const timer = setTimeout((): void => setLoading(false), 700);
    
    return (): void => clearTimeout(timer);
  }, []);
  
  return (
    <ReactQueryProvider>
      { loading && <PageLoader /> }
      
      <div className="md:ml-15 pt-18 md:pt-6">
        { children }
      </div>
      
      <Navigation />
    </ReactQueryProvider>
  );
}
