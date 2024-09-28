import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"
import Header from "@/app/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Document = async () => {
    const clerkUser = await currentUser();
    if(!clerkUser) redirect('/sign-in');

  return (
    <main className="flex w-full flex-col items-center">
        <Header className="left-0 top-0 my-4">
        <div className="flex items-center gap-2 lg:gap-4">
          {<SignedIn>
            <UserButton />
          </SignedIn>}
        </div>
        </Header>
        <ECLEnterpriseForm />
    </main>
  )
}

export default Document