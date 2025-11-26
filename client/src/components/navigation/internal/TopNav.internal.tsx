import Link from "next/link";
import clsx from "clsx";
import { getNavButton, getNavButtonClass } from "@/components/navigation/util/navigation.util";
import { FaInstagram } from "react-icons/fa";
import { navElement } from "@/components/navigation/data/navigation.data";
import { NavElement } from "@/components/navigation/type/navigation.type";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { usePathname } from "next/navigation";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";
import { AvatarImage } from "@/components/shared/image/AvatarImage.shared";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";

export const TopNav = () => {
  const {theme, nextTheme} = useThemeStore();
  const pathname: string = usePathname();
  
  const {data: user} = useUser();
  
  const imageSrc: string = user ? user.avatarUrl : "/assets/user-profile/defaultProfile.jpg";
  const imageAlt: string = user ? user.username : "...";
  
  return (
    <div className={ "w-full md:w-fit md:h-screen max-w-300 z-50 flex md:flex-col md:justify-start md:space-y-6 items-center justify-around" }>
      
      <div className={ "lg:w-full hidden md:block" }>
        <Link href={ "/" }>
          <button
            className={
              clsx(
                "css-react-icon-size mb-8 lg:flex lg:w-43 gap-2 items-center",
                getNavButtonClass("no-background", pathname, theme),
              )
            }
          >
            <FaInstagram />
            
            <div className={ "hidden lg:block" }>
              <ShinyText
                text={ "SocialMedia" }
                theme={ theme }
                className={ "text-xl" }
              />
            </div>
          
          </button>
        </Link>
      </div>
      
      
      { navElement.map((element: NavElement) => (
        <div className={ "lg:w-full" }
             key={ element.name }>
          <Link href={ element.path }>
            <button
              className={
                clsx(
                  "css-react-icon-size lg:flex gap-2 items-center lg:w-43",
                  getNavButtonClass(element.path, pathname, theme),
                )
              }
            >
              { getNavButton(element.icon, pathname, element.path) }
              <p className={ "hidden lg:block text-base" }>{ element.name }</p>
            </button>
          </Link>
        </div>
      )) }
      
      <Link href={ "/profile" }
            className={ "lg:w-full" }
      >
        <button
          className={
            clsx(
              "css-react-icon-size lg:flex gap-2 items-center lg:w-43",
              getNavButtonClass("/profile", pathname, theme),
            )
          }
        >
          <AvatarImage
            src={ imageSrc }
            alt={ imageAlt }
            width={ 50 }
            height={ 50 }
            className={ "w-6 aspect-square object-contain rounded-full" }
          />
          <p className={ "hidden lg:block text-base" }>Profile</p>
        </button>
      </Link>
      
      {/* Theme switch button */ }
      <button
        onClick={ (): void => nextTheme() }
        className={ clsx("hover:font-semibold lg:flex lg:w-full hover:cursor-pointer") }
      >
        TE
      </button>
    </div>
  );
};
