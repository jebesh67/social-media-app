import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { TopNavInternal } from "@/components/navigation/internal/TopNav.internal";
import { BottomNavInternal } from "@/components/navigation/internal/BottomNav.internal";

export const RenderNavs = () => {
  const {theme} = useThemeStore();
  
  return (
    <nav
      className={ clsx(
        "w-full md:w-fit md:h-screen max-w-300 z-50 flex md:flex-col md:justify-around md:space-y-4 items-center justify-around css-transition shadow-md px-2 md:py-6",
        ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
      ) }
    >
      
      <TopNavInternal />
      <BottomNavInternal />
    
    </nav>
  );
};
