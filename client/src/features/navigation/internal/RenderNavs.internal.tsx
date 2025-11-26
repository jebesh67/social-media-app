import clsx from "clsx";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { TopNav } from "@/features/navigation/internal/TopNav.internal";
import { BottomNav } from "@/features/navigation/internal/BottomNav.internal";

export const RenderNavs = () => {
  const {theme} = useThemeStore();
  
  return (
    <nav
      className={ clsx(
        "w-full md:w-fit md:h-screen max-w-300 z-50 flex md:flex-col md:justify-around md:space-y-4 items-center justify-around css-transition shadow-md px-2 md:py-6",
        ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
      ) }
    >
      
      <TopNav />
      <BottomNav />
    
    </nav>
  );
};
