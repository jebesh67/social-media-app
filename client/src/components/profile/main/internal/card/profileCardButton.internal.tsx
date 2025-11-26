import { useThemeStore } from "@/common/stores/theme/theme.store";
import { clsx } from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import Link from "next/link";

export const ProfileCardButton = () => {
  const {theme} = useThemeStore();
  
  return (
    <div className={ "col-span-10 mt-4 flex justify-center items-center text-sm font-semibold select-none css-transition" }>
      
      <Link
        href={ "/profile/edit" }
        className={ "w-full max-w-40 rounded-xl" }
      >
        <button
          className={
            clsx("py-1.5 md:py-2 w-full max-w-40 rounded-xl hover:cursor-pointer active:opacity-60",
              ifTheme(theme, "bg-zinc-800 hover:bg-zinc-800/70", "bg-zinc-300/90 hover:bg-zinc-300/70"))
          }>
          Edit profile
        </button>
      </Link>
    
    </div>
  );
};
