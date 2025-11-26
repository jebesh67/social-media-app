"use client";

import { RenderNavs } from "@/features/navigation/internal/RenderNavs.internal";
import { usePathname } from "next/navigation";
import { OptionsMenu } from "@/features/shared/options-menu/OptionsMenu.shared";
import { useShowOptionsMenuStore } from "@/core/stores/options-menu/showOptionsMenu.store";
import Auth from "@/features/auth/Auth.shared";
import { useShowAuthPanelStore } from "@/core/stores/auth-panel/showAuthPanel.store";

const Navigation = () => {
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
          <OptionsMenu />
        )
      }
      
      {
        showAuthPanel && (
          <Auth isFloating={ true } />
        )
      }
    </>
  
  );
};

export default Navigation;