import clsx from "clsx";
import { getNavButtonClass } from "@/features/navigation/util/navigation.util";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useShowOptionsMenuStore } from "@/core/stores/options-menu/showOptionsMenu.store";
import { useTheme } from "@/core/hooks/theme/useTheme";

export const BottomNav = () => {
  const [theme] = useTheme();
  const {showOptionsMenu, setShowOptionsMenu} = useShowOptionsMenuStore();
  
  const pathname: string = usePathname();
  
  return (
    <div className={ "hidden md:block" }>
      <button
        className={
          clsx(
            "css-react-icon-size lg:flex gap-2 items-center lg:w-43",
            getNavButtonClass("no-background", pathname, theme),
          )
        }
        onMouseDown={ (): void => setShowOptionsMenu(!showOptionsMenu) }
      >
        <RxHamburgerMenu />
        <p className={ "hidden lg:block text-base" }>Options</p>
      </button>
    </div>
  );
};
