import { NavElement } from "@/components/navigation/type/navigation.type";
import { IoAddCircleOutline, IoAddCircleSharp, IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { IoIosSearch, IoMdSearch } from "react-icons/io";

export const navElement: NavElement[] = [
  {
    name: "home",
    path: "/",
    icon: {
      inactive: <IoHomeOutline />,
      active: <IoHomeSharp />,
    },
  }, {
    name: "explore",
    path: "/explore",
    icon: {
      inactive: <IoIosSearch />,
      active: <IoMdSearch />,
    },
  }, {
    name: "post",
    path: "/post",
    icon: {
      inactive: <IoAddCircleOutline />,
      active: <IoAddCircleSharp />,
    },
  },
];