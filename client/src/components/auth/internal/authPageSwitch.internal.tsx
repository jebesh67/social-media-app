"use client";

import { PageSwitchType } from "@/components/auth/type/pageSwitch.type";

type Props = {
  page: PageSwitchType;
  setPageAction: React.Dispatch<React.SetStateAction<PageSwitchType>>;
}

export const AuthPageSwitchInternal = ({page, setPageAction}: Props) => {
  return (
    <div className={ "flex justify-center items-center space-x-4" }>
      <button className={ "py-2 px-5 bg-red-500 rounded-xl" }
              onClick={ (): void => setPageAction("login") }>Login
      </button>
      <button className={ "py-2 px-5 bg-red-500 rounded-xl" }
              onClick={ (): void => setPageAction("sign-up") }>Sign up
      </button>
    </div>
  );
};
