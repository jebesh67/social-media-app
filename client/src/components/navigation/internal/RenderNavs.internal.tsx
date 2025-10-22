import { NavElement } from "@/components/navigation/type/navigation.type";
import Link from "next/link";
import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { navElement } from "@/components/navigation/data/navigation.data";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { usePathname } from "next/navigation";
import { getNavButton, getNavButtonClass } from "@/components/navigation/util/navigation.util";
import Image from "next/image";

export const RenderNavs = () => {
  const {theme, nextTheme} = useThemeStore();
  const pathname: string = usePathname();
  
  return (
    <nav
      className={ clsx(
        "w-full md:w-fit md:h-screen max-w-300 z-50 flex md:flex-col md:justify-center md:space-y-4 items-center justify-around css-transition shadow-md px-2",
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
              { getNavButton(element.icon, pathname, element.path) }
            </button>
          </Link>
        </div>
      )) }
      
      <Link href={ "/profile" }>
        <button
          className={
            clsx(
              "css-react-icon-size",
              getNavButtonClass("/profile", pathname, theme),
            )
          }
        >
          <Image src="/assets/user-profile/defaultProfile.jpg"
                 alt={ "Hiu" }
                 width={ 50 }
                 height={ 50 }
                 className={ "w-6 aspect-square object-contain rounded-full" }
                 priority
          />
        
        </button>
      </Link>
      
      
      {/* Theme switch button */ }
      <button
        onClick={ (): void => nextTheme() }
        className={ clsx("hover:font-semibold hover:cursor-pointer") }
      >
        TE
      </button>
    </nav>
  );
};
