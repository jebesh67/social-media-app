"use client";

import { ChangeEvent } from "react";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";

interface CustomInputProps {
  id: string;
  type?: string;
  isMultiLine?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  width?: "full" | "large" | "medium" | "small";
  isRequired?: boolean;
}

export const CustomInput = ({
  id,
  type = "text",
  isMultiLine = false,
  value,
  onChange,
  placeholder,
  rows = 4,
  width = "small",
  isRequired = true,
}: CustomInputProps) => {
  const {theme} = useThemeStore();
  
  const baseStyles = clsx(
    "peer w-full rounded-xl px-5 pt-5 pb-3 text-xs bg-transparent outline-none resize-none transition-all duration-200",
    ifTheme(theme, "bg-zinc-800 text-zinc-400", "bg-zinc-300 text-zinc-800"),
    "placeholder-transparent focus:ring-0",
    
    "placeholder-transparent focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600",
  );
  
  return (
    <div className={ clsx(
      "relative w-full",
      
      width === "small" && "max-w-65",
      width === "medium" && "max-w-80",
      width === "large" && "max-w-100",
      width === "full" && "max-w-full",
    ) }>
      {
        isMultiLine ? (
          <textarea
            id={ id }
            value={ value }
            onChange={ onChange }
            placeholder={ placeholder }
            required={ isRequired }
            rows={ rows }
            className={ baseStyles }
          />
        ) : (
          <input
            id={ id }
            type={ type }
            value={ value }
            onChange={ onChange }
            placeholder={ placeholder }
            required={ isRequired }
            className={ baseStyles }
          />
        )
      }
      
      <label
        htmlFor={ id }
        className={ clsx(
          "absolute left-5 top-4 text-xs transition-all duration-200 ease-in-out py-1",
          
          width === "small" && "w-55",
          width === "medium" && "w-70",
          width === "large" && "w-90",
          width === "full" && "w-[calc(100%-40px)]",
          
          ifTheme(theme,
            "text-zinc-500 ", "text-zinc-600 ",
          ),
          
          isMultiLine && (ifTheme(theme, "bg-zinc-800", "bg-zinc-300")),
          
          "peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-500",
          
          "peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-500",
          
          "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px]",
        ) }
      >
        { placeholder }
      </label>
    </div>
  );
};
