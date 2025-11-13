import { CustomError } from "@/common/helper/error/customError.helper";

type Props = {
  value: CustomError
}

export const ValidationErrorShared = ({value}: Props) => {
  const {username, email, password} = value.validation!;
  const errorArray: string[][] = [username, email, password].filter((v): v is string[] => v !== undefined);
  
  return (
    <ul className={ "sm:fixed sm:bottom-2 sm:right-2 w-full sm:w-fit list-disc px-8 py-3 flex flex-col justify-start bg-red-500 sm:rounded-xl text-xs" }>
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
  );
};
