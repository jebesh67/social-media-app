import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { RenderSettingsInternal } from "@/components/settings/internal/RenderSettings.internal";

export const SettingsComponent = () => {
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Settings" } />
      
      <div>
        <RenderSettingsInternal />
      </div>
    </>
  );
};
