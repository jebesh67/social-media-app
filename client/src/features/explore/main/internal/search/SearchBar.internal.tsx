import { CustomInput } from "@/features/shared/input/CustomInput";
import { useTheme } from "@/core/hooks/theme/useTheme";
import { clsx } from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { useState } from "react";

export const SearchBar = () => {
  const [theme] = useTheme();
  
  const [username, setUsername] = useState<string>("");
  
  return (
    <div className={ clsx(
      ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
      "p-4",
    ) }>
      <CustomInput id={ "" }
                   value={ username }
                   onChange={ (e) => setUsername(e.target.value) }
                   placeholder={ "Search" }
                   width={ "full" }
      />
    </div>
  );
};
