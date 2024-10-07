'use client';

import Link from 'next/link';
import { FiFileText, FiTrash2 } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';

interface DocumentListItemProps {
  id: string | any
  name: string | any;
  createdAt: string | any;
  onDelete: (id: string) => void;
  sharedWithEmails: string[];
}

const DocumentListItem = ({ id, name, createdAt, onDelete, sharedWithEmails }: DocumentListItemProps) => {
  return (
    <li className="bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
      <Link href={`/documents/${id}`} className="block p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FiFileText className="text-blue-400 text-xl" />
            <div>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm text-gray-400">Created about {createdAt}</p>
            </div>
          </div>
              {sharedWithEmails.length > 0 && (
              <div className='flex items-center space-x-2'>
                <span className="text-green-400 text-xl">
                  <FiUsers />
                </span>
                <span className="text-sm text-gray-400">{sharedWithEmails.length}</span>
              </div>
              )}
          <button 
            className="text-red-400 hover:text-red-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </Link>
    </li>
  );
};

export default DocumentListItem;