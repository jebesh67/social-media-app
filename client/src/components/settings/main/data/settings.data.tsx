import { SettingsElement } from "@/components/settings/main/type/settings.type";
import { FaUserShield } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";

export const settingsElement: SettingsElement[] = [
  {
    name: "Manage Account",
    path: "/settings/manage-account",
    logo: <FaUserShield />,
  },
  {
    name: "Customise",
    path: "/settings/customise",
    logo: <GiSettingsKnobs />,
  },
];