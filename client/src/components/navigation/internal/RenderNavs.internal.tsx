import { NavElement } from "@/components/navigation/services/types/navigation.type";
import Link from "next/link";
import clsx from "clsx";
import { useThemeStore } from "@/stores/theme/themeStore";
import { navElement } from "@/components/navigation/data/navigation.data";
import { ifTheme } from "@/utils/theme/helper/theme.helper";
import { usePathname } from "next/navigation";
import { getNavButtonClass } from "@/components/navigation/services/navigation.helper";

export const RenderNavs = () => {
  const {theme, nextTheme} = useThemeStore();
  const pathname: string = usePathname();
  
  return (
    <nav
      className={ clsx(
        "w-full max-w-300 z-50 flex items-center justify-around m-2 rounded-full py-2 css-transition shadow-md",
        ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
      ) }
    >
      { navElement.map((element: NavElement) => (
        <div key={ element.name }>
          <Link href={ element.path }>
            <button
              className={
                clsx(
                  "css-react-icon-size",
                  getNavButtonClass(element.path, pathname, theme),
                )
              }
            >
              { element.icon.inactive }
            </button>
          </Link>
        </div>
      )) }
      
      {/* Theme switch button */ }
      <button
        onClick={ (): void => nextTheme() }
        className={ clsx("hover:font-semibold hover:cursor-pointer") }
      >
        THEME
      </button>
    </nav>
  );
};
