"use client";

import { RenderNavs } from "@/components/navigation/internal/RenderNavs.internal";
import { usePathname } from "next/navigation";
import { OptionsMenuShared } from "@/components/shared/options-menu/OptionsMenu.shared";
import { useShowOptionsMenuStore } from "@/common/stores/options-menu/showOptionsMenu.store";
import { AuthShared } from "@/components/auth/Auth.shared";
import { useShowAuthPanelStore } from "@/common/stores/auth-panel/showAuthPanel.store";

export const Navigation = () => {
  const pathname: string = usePathname();
  
  const {showOptionsMenu} = useShowOptionsMenuStore();
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
        showOptionsMenu && (
          <OptionsMenuShared />
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
