"use client";

import { RenderNavs } from "@/components/navigation/internal/RenderNavs.internal";
import { usePathname } from "next/navigation";
import { AuthOptionsInternal } from "@/components/profile/internal/header/AuthOptions.internal";
import { useShowAuthOptionsStore } from "@/common/stores/AuthControl/showAuthOptions.store";
import { AuthShared } from "@/components/auth/Auth.shared";
import { useShowAuthPanelStore } from "@/common/stores/AuthControl/showAuthPanel.store";

export const Navigation = () => {
  const pathname: string = usePathname();
  
  const {showAuthOptions} = useShowAuthOptionsStore();
  const {showAuthPanel} = useShowAuthPanelStore();
  
  const showNavs: boolean = !pathname.startsWith("/auth");
  
  return (
    <>
      {
        showNavs && (
          <footer className={ "fixed bottom-0 w-full md:w-fit select-none z-40" }>
            <RenderNavs />
          </footer>
        )
      }
      
      {
        showAuthOptions && (
          <AuthOptionsInternal />
        )
      }
      
      {
        showAuthPanel && (
          <AuthShared isFloating={ true } />
        )
      }
    </>
  
  );
};
