import { CustomHeader } from "@/components/shared/header/CustomHeader.shared";
import { ManageAccount } from "@/components/settings/manage-account/ManageAccount";

const ManageAccountPage = () => {
  return (
    <>
      <CustomHeader
        type={ "back" }
        text={ "Manage Account" } />
      <ManageAccount />
    </>
  );
};

export default ManageAccountPage;
