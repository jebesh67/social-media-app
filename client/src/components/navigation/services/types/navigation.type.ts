import { ReactElement } from "react";

export type NavElement = {
  name: string;
  path: string;
  icon: {
    inactive: ReactElement,
    active: ReactElement,
  }
}

