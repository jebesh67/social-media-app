import { useThemeStore } from "@/common/stores/theme/themeStore";
import { clsx } from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";

export const ProfileCardButtonInternal = () => {
  const {theme} = useThemeStore();
  
  return (
    <div className={ "col-span-10 mt-4 flex justify-center items-center text-sm font-semibold select-none css-transition" }>
      <button
        className={
          clsx("py-1.5 md:py-2 w-full max-w-40 rounded-xl hover:cursor-pointer active:opacity-60",
            ifTheme(theme, "bg-zinc-700 hover:bg-zinc-600", "bg-zinc-400/40 hover:bg-zinc-400/80"))
        }>
        Edit profile
      </button>
    </div>
  );
};
