import ShinyText from "@/features/shared/effects/shinyText/ShinyText";
import { useTheme } from "@/core/hooks/theme/useTheme";
import { clsx } from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";

export const PageLoader = () => {
  const [theme] = useTheme();
  
  return (
    <div className={ clsx(
      "fixed inset-0 flex items-center justify-center bg-gradient-to-b z-60 select-none",
      ifTheme(theme, "from-zinc-800 to-zinc-900", "from-zinc-100 to-zinc-200"),
    ) }>
      <ShinyText
        text="SocialMedia"
        disabled={ false }
        speed={ 3 }
        className="text-3xl font-bold"
        theme={ theme }
      />
    </div>
  );
};
