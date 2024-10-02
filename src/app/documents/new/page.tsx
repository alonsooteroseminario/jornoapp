import CommentsSection from "@/app/components/CommentsSection";
import DocumentHeader from "@/app/components/DocumentHeader";
import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"
import FormatSidebar from "@/app/components/FormatSidebar";
import Header from "@/app/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";
interface DocumentProps {
    params: { id: string };
  }
  
  const Document = async ({ params }: DocumentProps) => {
      const clerkUser = await currentUser();
      if(!clerkUser) redirect('/sign-in');
      
      const documentId = params.id;
  
      return (
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
              <DocumentHeader documentId={documentId} />
              <div className="flex flex-1">
                  <ECLEnterpriseForm documentId={documentId} />
              </div>
          </div>
      )
  }
  
  export default Document;