import { CustomHeader } from "@/features/shared/header/CustomHeader.shared";
import { RenderSettings } from "@/features/settings/main/internal/RenderSettings.internal";

const SettingsComponent = () => {
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

export default SettingsComponent;
