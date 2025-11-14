import { CustomError } from "@/common/helper/error/customError.helper";
import { clsx } from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { MdClose } from "react-icons/md";
import { useThemeStore } from "@/common/stores/theme/theme.store";

type Props = {
  value: CustomError;
  setShowValidationAction: (showValidation: boolean) => void;
}

export const ValidationErrorShared = ({value, setShowValidationAction}: Props) => {
  const {theme} = useThemeStore();
  
  const {username, email, password, confirmPassword} = value.validation!;
  const errorArray: string[][] = [username, email, password, confirmPassword].filter((v: string[] | undefined): v is string[] => v !== undefined);
  
  return (
    <div className={ clsx(
      "sm:fixed sm:bottom-2 sm:right-2 w-full sm:w-fit px-4 py-2 flex flex-col sm:rounded-xl text-xs shadow-md backdrop-blur-md",
      ifTheme(theme, "bg-zinc-600/70", "bg-zinc-300/90"),
    ) }>
      <div className={ "flex justify-end" }>
        <button
          className={ clsx("active:opacity-80 text-base px-2 py-1 rounded-lg hover:cursor-pointer",
            ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
          onClick={ (): void => setShowValidationAction(false) }
        >
          <MdClose />
        </button>
      </div>
      
      <ul className={ "list-disc px-4 py-2 flex flex-col justify-start text-xs" }>
        {
          errorArray.map((error: string[]) => (
            error.map((data: string, index: number) => (
              <li key={ index }>
                { data }
              </li>
            ))
          ))
        }
      </ul>
    </div>
  );
};
