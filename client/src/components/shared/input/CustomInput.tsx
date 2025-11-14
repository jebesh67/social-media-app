"use client";

import { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { Eye, EyeOff } from "lucide-react";

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
  isInvalidInput?: boolean;
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
  isInvalidInput = false,
}: CustomInputProps) => {
  const {theme} = useThemeStore();
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const baseStyles: string = clsx(
    "peer w-full rounded-xl px-5 pt-5 pb-3 text-xs bg-transparent outline-none resize-none transition-all duration-200",
    ifTheme(theme, "bg-zinc-800 text-zinc-400", "bg-zinc-300 text-zinc-800"),
    "placeholder-transparent focus:ring-0",
    
    "placeholder-transparent focus:ring-1 focus:shadow-[0px_0px_2px_2px]",
    
    isInvalidInput ? "ring-1 ring-red-600 shadow-[0px_0px_2px_2px] shadow-red-600" : "focus:ring-blue-600 focus:shadow-blue-600",
  );
  
  const isPassword: boolean = type === "password";
  const inputType: string = isPassword && showPassword ? "text" : type;
  
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
          <>
            <input
              id={ id }
              type={ inputType }
              value={ value }
              onChange={ onChange }
              placeholder={ placeholder }
              required={ isRequired }
              className={ baseStyles }
            />
            
            { isPassword && (
              <button
                type="button"
                onClick={ (): void => setShowPassword(!showPassword) }
                className="absolute right-3 top-4 text-zinc-500 hover:text-blue-500 hover:cursor-pointer transition-colors"
                tabIndex={ -1 }
              >
                { showPassword ? <EyeOff size={ 16 } /> : <Eye size={ 16 } /> }
              </button>
            ) }
          </>
        )
      }
      
      <label
        htmlFor={ id }
        className={ clsx(
          "absolute left-5 top-4 text-xs transition-all duration-200 ease-in-out py-1 select-none",
          
          width === "small" && "w-55",
          width === "medium" && "w-70",
          width === "large" && "w-90",
          width === "full" && "w-[calc(100%-40px)]",
          
          ifTheme(theme,
            "text-zinc-500 ",
            "text-zinc-600 ",
          ),
          
          isMultiLine && (ifTheme(theme, "bg-zinc-800", "bg-zinc-300")),
          
          "peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-500",
          
          "peer-focus:top-1 peer-focus:text-[10px]",
          isInvalidInput ? "peer-focus:text-red-500" : "peer-focus:text-blue-500",
          
          "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px]",
        ) }
      >
        { placeholder }
      </label>
    </div>
  );
};
