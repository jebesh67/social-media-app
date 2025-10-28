import clsx from "clsx";
import { getNavButtonClass } from "@/components/navigation/util/navigation.util";
import { RxHamburgerMenu } from "react-icons/rx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { usePathname } from "next/navigation";
import { useShowAuthOptions } from "@/common/stores/AuthNavigationControl/showAuthOptionsStore";

export const BottomNavInternal = () => {
  const {theme} = useThemeStore();
  const {showAuthOptions, setShowAuthOptions} = useShowAuthOptions();
  
  const pathname: string = usePathname();
  
  return (
    <div className={ "hidden md:block" }>
      <button
        className={
          clsx(
            "css-react-icon-size",
            getNavButtonClass("no-background", pathname, theme),
          )
        }
        onMouseDown={ () => setShowAuthOptions(!showAuthOptions) }
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
};
