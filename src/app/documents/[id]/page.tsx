'use client';

import DocumentHeader from "@/app/components/DocumentHeader";
import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"
import PopupOverlay from "@/app/components/PopupOverlay";

const Document = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <DocumentHeader />
            <div className="flex flex-1">
                <ECLEnterpriseForm documentId={params.id} />
            </div>
            <PopupOverlay timesheetId={params.id} />
        </div>
    )
}

export default Document