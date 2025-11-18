import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { RenderSettingsInternal } from "@/components/settings/view/internal/RenderSettings.internal";

export const SettingsComponent = () => {
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Settings" } />
      
      <div className={ "flex justify-center md:mt-8" }>
        <RenderSettingsInternal />
      </div>
    </>
  );
};
