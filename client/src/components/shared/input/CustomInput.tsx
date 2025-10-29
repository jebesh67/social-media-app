"use client";

import { ChangeEvent } from "react";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";

interface CustomInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const CustomInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}: CustomInputProps) => {
  const {theme} = useThemeStore();
  
  return (
    <div className="relative w-full max-w-65">
      <input
        id={ id }
        type={ type }
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
        required
        className={ clsx(
          "peer pb-3 pt-5 px-5 rounded-xl w-full text-xs bg-transparent outline-none",
          ifTheme(theme, "bg-zinc-800/70 text-zinc-400", "bg-zinc-300 text-zinc-800"),
          "placeholder-transparent focus:ring-0",
        ) }
      />
      <label
        htmlFor={ id }
        className={ clsx(
          "absolute left-5 top-4 text-xs transition-all duration-200 ease-in-out",
          ifTheme(theme, "text-zinc-400", "text-zinc-600"),
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-500",
          "peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-500",
          "peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-[10px]",
        ) }
      >
        { placeholder }
      </label>
    </div>
  );
};
