"use client";

import { useEffect, useState } from "react";
import ReactQueryProvider from "@/core/providers/react-query/ReactQuery.provider";
import Navigation from "@/features/navigation";
import { PageLoader } from "@/features/shared/loader/PageLoader";

type Props = {
  children: React.ReactNode;
}

const ClientAppShell = ({
  children,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  
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
};

export default ClientAppShell;
