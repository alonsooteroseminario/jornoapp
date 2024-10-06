import DocumentHeader from "@/app/components/DocumentHeader";
import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface DocumentProps {
    params: { id: string };
  }
  
  const Document = async ({ params }: DocumentProps) => {
      const clerkUser = await currentUser();
      if(!clerkUser) redirect('/sign-in');
      
      const documentId = '5f8e9b3a2c1d7f4e6a0b';
      console.log("documentId : ",documentId );
  
      return (
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
              <DocumentHeader />
              <div className="flex flex-1">
                  <ECLEnterpriseForm documentId={documentId} />
              </div>
          </div>
      )
  }
  
  export default Document;