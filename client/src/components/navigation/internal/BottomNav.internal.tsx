import clsx from "clsx";
import { getNavButtonClass } from "@/components/navigation/util/navigation.util";
import { RxHamburgerMenu } from "react-icons/rx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { usePathname } from "next/navigation";
import { useShowOptionsMenuStore } from "@/common/stores/options-menu/showOptionsMenu.store";

export const BottomNavInternal = () => {
  const {theme} = useThemeStore();
  const {showOptionsMenu, setShowOptionsMenu} = useShowOptionsMenuStore();
  
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
        onMouseDown={ () => setShowOptionsMenu(!showOptionsMenu) }
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
};
