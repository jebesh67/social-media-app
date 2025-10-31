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
}

export const CustomInput = ({
  id,
  type = "text",
  isMultiLine = false,
  value,
  onChange,
  placeholder,
  rows = 4,
}: CustomInputProps) => {
  const {theme} = useThemeStore();
  
  const baseStyles = clsx(
    "peer w-full rounded-xl px-5 pt-5 pb-3 text-xs bg-transparent outline-none resize-none",
    ifTheme(theme, "bg-zinc-800 text-zinc-400", "bg-zinc-300 text-zinc-800"),
    "placeholder-transparent focus:ring-0",
  );
  
  return (
    <div className="relative w-full max-w-65">
      {
        isMultiLine ? (
          <textarea
            id={ id }
            value={ value }
            onChange={ onChange }
            placeholder={ placeholder }
            required
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
            required
            className={ baseStyles }
          />
        )
      }
      
      <label
        htmlFor={ id }
        className={ clsx(
          "absolute left-5 top-4 text-xs transition-all duration-200 ease-in-out w-55 py-1",
          
          ifTheme(theme,
            "text-zinc-400 ", "text-zinc-600 ",
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
