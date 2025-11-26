import clsx from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { useThemeStore } from "@/core/stores/theme/theme.store";

type Props = {
  isPending?: boolean;
  isInvalidInput?: boolean;
  type?: "submit" | "button";
  text: string
  pendingText?: string
  onClick?: () => void
}

export const CustomSubmitButton = ({
  isPending = false,
  isInvalidInput = false,
  type = "submit",
  text = "Button",
  pendingText = "Loading...",
  onClick,
}: Props) => {
  const {theme} = useThemeStore();
  
  return (
    <button
      className={
        clsx(
          "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
          
          ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
          
          (isPending || isInvalidInput) && "opacity-60 hover:cursor-default",
        )
      }
      type={ type }
      onClick={ onClick }
      disabled={ isPending || isInvalidInput }>
      { isPending ? pendingText : text }
    </button>
  );
};
