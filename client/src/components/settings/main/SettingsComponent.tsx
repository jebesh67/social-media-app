import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { RenderSettings } from "@/components/settings/main/internal/RenderSettings.internal";

export const SettingsComponent = () => {
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Settings" } />
      
      <div className={ "flex justify-center md:mt-8" }>
        <RenderSettings />
      </div>
    </>
  );
};
