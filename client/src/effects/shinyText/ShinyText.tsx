import clsx from "clsx";
import { Theme } from "@/utils/theme/types/theme.types";
import { ifTheme } from "@/utils/theme/helper/theme.helper";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  theme: Theme;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  theme,
}) => {
  const animationDuration = `${ speed }s`;
  
  return (
    <div
      className={ clsx(
        "css-shiny-text-base",
        ifTheme(theme, "css-shiny-text-dark", "css-shiny-text-light"),
        {disabled},
        className,
      ) }
      style={ {animationDuration} }
    >
      { text }
    </div>
  );
};

export default ShinyText;
