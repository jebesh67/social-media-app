"use client";

import { useEffect, useState } from "react";
import ThemeProvider from "@/common/providers/theme/ThemeProvider";
import { ReactQueryProvider } from "@/common/providers/react-query/ReactQuery.provider";
import { Navigation } from "@/components/navigation/Navigation";
import { Theme } from "@/common/utils/theme/types/theme.types";
import { PageLoader } from "@/components/shared/loader/PageLoader";

type Props = {
  children: React.ReactNode;
  initialTheme: Theme;
}

export default function ClientAppShell({
  children,
  initialTheme,
}: Props) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    
    return (): void => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <PageLoader />;
  }
  
  return (
    <ReactQueryProvider>
      <ThemeProvider initialTheme={ initialTheme }>
        <div className="md:ml-15 pt-18 md:pt-6">{ children }</div>
        <Navigation />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
