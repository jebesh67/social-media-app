"use client";

import { ManageAccountCard } from "@/components/settings/manage-account/shared/ManageAccountCard.shared";
import { ChangeUsername } from "@/components/settings/manage-account/internal/ChangeUsername.internal";
import { ChangeEmail } from "@/components/settings/manage-account/internal/ChangeEmail.internal";

export const ManageAccount = () => {
  return (
    <main className={ "flex flex-col gap-y-4 items-center justify-center px-4" }>
      <ManageAccountCard
        Component={ ChangeUsername }
        buttonText={ "Change username" } />
      
      <ManageAccountCard
        Component={ ChangeEmail }
        buttonText={ "Change email" } />
    </main>
  );
};
