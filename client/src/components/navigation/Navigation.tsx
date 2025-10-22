"use client";

import { RenderNavs } from "@/components/navigation/internal/RenderNavs.internal";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname: string = usePathname();
  
  const showNavs: boolean = !pathname.startsWith("/auth");
  
  return (
    <>
      {
        showNavs && (
          <footer className={ "fixed bottom-0 w-full md:w-fit select-none" }>
            <RenderNavs />
          </footer>
        )
      }
    </>
  
  );
};
