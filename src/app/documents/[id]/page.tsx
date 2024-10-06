import DocumentHeader from "@/app/components/DocumentHeader";
import { ECLEnterpriseForm } from "@/app/components/ECLEnterpriseForm"

const Document = async () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <DocumentHeader />
            <div className="flex flex-1">
            <ECLEnterpriseForm documentId={""} />
            </div>
        </div>
    )
}

export default Document