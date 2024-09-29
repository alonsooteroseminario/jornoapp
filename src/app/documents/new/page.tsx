import CommentsSection from "@/app/components/CommentsSection";
import DocumentHeader from "@/app/components/DocumentHeader";
import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"
import FormatSidebar from "@/app/components/FormatSidebar";
import Header from "@/app/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Document = async () => {
    const clerkUser = await currentUser();
    if(!clerkUser) redirect('/sign-in');
    const documentTitle = "Test for Mario Romero";
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <DocumentHeader documentTitle={documentTitle} />
            <div className="flex flex-1">
            <ECLEnterpriseForm />
            </div>
        </div>
    )
}

export default Document