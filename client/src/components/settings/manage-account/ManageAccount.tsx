"use client";

import { ManageAccountCardShared } from "@/components/settings/manage-account/shared/ManageAccountCard.shared";
import { ChangeUsernameInternal } from "@/components/settings/manage-account/internal/ChangeUsername.internal";
import { ChangeEmailInternal } from "@/components/settings/manage-account/internal/ChangeEmail.internal";

export const ManageAccount = () => {
  return (
    <main className={ "flex flex-col gap-y-4 items-center justify-center px-4" }>
      <ManageAccountCardShared
        Component={ ChangeUsernameInternal }
        buttonText={ "Change username" } />
      
      <ManageAccountCardShared
        Component={ ChangeEmailInternal }
        buttonText={ "Change email" } />
    </main>
  );
};
