import { CustomInput } from "@/features/shared/input/CustomInput";
import { useTheme } from "@/core/hooks/theme/useTheme";
import { clsx } from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { useSearchUser } from "@/core/hooks/react-query/user/mutation/useSearchUser";
import { SearchUserType } from "@/core/types/user/searchUser.type";
import { UseMutationResult } from "@tanstack/react-query";

type SearchBarProps = {
  setShowUserAction: React.Dispatch<SetStateAction<boolean>>
}

export const SearchBar = ({setShowUserAction}: SearchBarProps) => {
  const [theme] = useTheme();
  
  const searchUserMutation: UseMutationResult<SearchUserType[] | undefined, Error, string> = useSearchUser();
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [username, setUsername] = useState<string>("");
  
  const searchUsers = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value: string = e.currentTarget.value;
    setUsername(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout((): void => {
      searchUserMutation.mutate(value);
      
      if (value === "") {
        setShowUserAction(false);
      } else {
        setShowUserAction(true);
      }
    }, 300);
  };
  
  return (
    <div className={ clsx(
      ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
      "p-4",
    ) }>
      <CustomInput id={ "search-username" }
                   value={ username }
                   onChange={ searchUsers }
                   placeholder={ "Search" }
                   width={ "full" }
      />
    </div>
  );
};
