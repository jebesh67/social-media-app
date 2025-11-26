"use client";

import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";
import { useShowOptionsMenuStore } from "@/common/stores/options-menu/showOptionsMenu.store";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";


export const RenderHeader = () => {
  const {theme} = useThemeStore();
  const {showOptionsMenu, setShowOptionsMenu} = useShowOptionsMenuStore();
  
  const {data: currentUser, isLoading, isFetched} = useUser();
  
  return (
    <div
      className={
        clsx(
          "relative w-full max-w-300 z-50 flex items-center justify-center py-2 css-transition shadow-md md:hidden",
          ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
        )
      }
    >
      <button className={ "absolute left-2 text-2xl hover:cursor-pointer hover:opacity-85 active:opacity-70 css-transition" }>
        <Link href="/settings">
          <IoIosSettings />
        </Link>
      </button>
      
      <button
        className={ "hover:cursor-pointer" }
        onMouseDown={ (): void => setShowOptionsMenu(!showOptionsMenu) }
      >
        {
          isLoading ?
            <ShinyText
              text="Loading..."
              disabled={ false }
              speed={ 3 }
              className="css-header-text"
              theme={ theme }
            /> :
            currentUser ?
              <ShinyText
                text={ `${ currentUser.username }` }
                disabled={ false }
                speed={ 3 }
                className="css-header-text"
                theme={ theme }
              /> :
              isFetched && <div>No User Found</div>
        }
      </button>
    </div>
  );
};
