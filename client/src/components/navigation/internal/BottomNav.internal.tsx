import clsx from "clsx";
import { getNavButtonClass } from "@/components/navigation/util/navigation.util";
import { RxHamburgerMenu } from "react-icons/rx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { usePathname } from "next/navigation";
import { useShowAuthOptionsStore } from "@/common/stores/AuthControl/showAuthOptions.store";

export const BottomNavInternal = () => {
  const {theme} = useThemeStore();
  const {showAuthOptions, setShowAuthOptions} = useShowAuthOptionsStore();
  
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
