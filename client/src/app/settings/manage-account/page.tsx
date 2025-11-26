import { CustomHeader } from "@/features/shared/header/CustomHeader.shared";
import ManageAccount from "@/features/settings/manage-account";

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
