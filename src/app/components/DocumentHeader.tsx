'use client';

import React from 'react';
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FiShare2, FiArrowLeft, FiEdit } from 'react-icons/fi';
import Link from 'next/link';

interface DocumentHeaderProps {
  documentTitle: string;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ documentTitle }) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Jorno App</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">{documentTitle}</h2>
          <button className="text-white hover:text-gray-300">
            <FiEdit size={18} />
          </button>
        </div>

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