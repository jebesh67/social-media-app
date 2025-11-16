"use client";

import { useEffect, useState } from "react";
import { ReactQueryProvider } from "@/common/providers/react-query/ReactQuery.provider";
import { Navigation } from "@/components/navigation/Navigation";
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
      
      <div className="md:ml-15 lg:ml-47.5 pt-18 md:pt-6">
        { children }
      </div>
      
      <Navigation />
    </ReactQueryProvider>
  );
}
