"use client";

import { PageSwitchType } from "@/components/auth/type/pageSwitch.type";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";

type Props = {
  page: PageSwitchType;
  setPageAction: React.Dispatch<React.SetStateAction<PageSwitchType>>;
}

export const AuthPageSwitchInternal = ({page, setPageAction}: Props) => {
  const {theme} = useThemeStore();
  
  return (
    <div className={ "flex justify-center items-center space-x-4 css-transition" }>
      <button className={
        clsx(
          "py-2 px-5 rounded-xl hover:cursor-pointer hover:opacity-90 active:scale-102 font-semibold shadow-md",
          page === "login" && (ifTheme(theme,
            "bg-zinc-800 ring-2 ring-blue-600",
            "bg-zinc-300 ring-2 ring-blue-400")),
          page === "sign-up" && (ifTheme(theme,
            "bg-zinc-700",
            "bg-zinc-300/40")),
        )
      }
              onClick={ (): void => setPageAction("login") }>Login
      </button>
      
      <button className={
        clsx(
          "py-2 px-5 rounded-xl hover:cursor-pointer hover:opacity-90 active:scale-102 font-semibold shadow-md",
          page === "login" && (ifTheme(theme,
            "bg-zinc-700 ",
            "bg-zinc-300/40")),
          page === "sign-up" && (ifTheme(theme,
            "bg-zinc-800 ring-2 ring-blue-600",
            "bg-zinc-300 ring-2 ring-blue-400")),
        )
      }
              onClick={ (): void => setPageAction("sign-up") }>Sign up
      </button>
    </div>
  );
};
