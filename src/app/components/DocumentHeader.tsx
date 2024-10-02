// components/DocumentHeader.tsx

import React from 'react';
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FiShare2, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import EditableTitle from './EditableTitle';

interface DocumentHeaderProps {
  documentId: string;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ documentId }) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Jorno App</h1>
        </div>
        
        <EditableTitle documentId={documentId} />

        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <FiShare2 className="mr-2" /> Share
          </button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;