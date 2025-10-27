"use client";

import { clsx } from "clsx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { MdClose } from "react-icons/md";

type Props = {
  showAuthPanel: boolean,
  setShowAuthPanel: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthPanelInternal = ({showAuthPanel, setShowAuthPanel}: Props) => {
  const {theme} = useThemeStore();
  return (
    <div className={ clsx(
      "md:hidden flex flex-col space-y-2 shadow-xl mt-2 px-6 pb-6 pt-2 rounded-xl text-sm font-semibold",
      ifTheme(theme,
        "bg-zinc-700",
        "bg-zinc-200",
      ),
    ) }>
      <div className={ "flex justify-end" }>
        <button
          className={ clsx("active:opacity-80 text-xl px-3 py-2 rounded-lg hover:cursor-pointer",
            ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
          onClick={ (): void => setShowAuthPanel(!showAuthPanel) }
        >
          <MdClose />
        </button>
      </div>
      
      <button className={ clsx(
        " w-40 py-2 rounded-xl hover:cursor-pointer hover:opacity-90 active:opacity-80 hover:scale-102 css-transition",
        ifTheme(theme,
          "bg-zinc-800",
          "bg-zinc-400/50",
        ),
      ) }>Switch user
      </button>
      
      <button className={ clsx(
        " w-40 py-2 rounded-xl hover:cursor-pointer hover:opacity-90 active:opacity-80 hover:scale-102 css-transition",
        ifTheme(theme,
          "bg-zinc-800",
          "bg-zinc-400/50",
        ),
      ) }>logout
      </button>
    </div>
  );
};
