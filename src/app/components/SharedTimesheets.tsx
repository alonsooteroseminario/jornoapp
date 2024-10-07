'use client';


import React from 'react';
import { FileText, Eye, User } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

import { dateConverter } from '@/lib/utils';
import { selectSharedEntries, TimesheetEntry } from '@/store/slice/timesheetSlice';
import { selectUser } from '@/store/slice/userSlice';
import Link from 'next/link';

const ProcessStep = ({ step }:any) => {
  const stepColors : any = {
    'draft': 'bg-yellow-500',
    'submitted for review': 'bg-blue-500',
    'reviewed with comments': 'bg-orange-500',
    'reviewed with no comments': 'bg-green-500'
  };
  const stepColor = stepColors[step?.toLowerCase()] || 'bg-gray-500';
  return (
    <span className={`${stepColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
      {step}
    </span>
  );
};

const SharedTimesheetItem = ({ id, name, owner, createdAt, step }:any) => (
  <li className="bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
    <Link href={`/documents/${id}`} className="block p-4">
      <div className="block p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="text-blue-400" size={24} />
            <div>
              <p className="text-lg font-semibold text-white">{name}</p>
              <p className="text-sm text-gray-400">Owner: {owner}</p>
              <p className="text-xs text-gray-400">Created {createdAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ProcessStep step={step} />
            <button className="text-green-400 hover:text-green-300" title="View Timesheet">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  </li>
);

const getEmailWithClerkId = (clerkId: string) => {
  
}

const SharedTimesheets = () => {
  const sharedTimesheets = useAppSelector(selectSharedEntries);
  const user = useAppSelector(selectUser);
  return (
    <div className="bg-gray-800 rounded-lg text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Shared Timesheets</h2>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          {sharedTimesheets.length > 0 && (
            <ul className="space-y-4">
              {sharedTimesheets.map((entry:TimesheetEntry) => (
                (entry.sharedWithEmails.includes(user.email)) && 
                <SharedTimesheetItem
                    key={entry?.id}
                    id={entry?.id}
                    owner={entry?.id}
                    name={entry?.metadata?.name}
                    createdAt={dateConverter(entry?.metadata?.createdAt || '')}
                    onDelete={()=>{

                    }}
                />
              ))}
            </ul>
          ) }
        </div>
      </div>
    </div>
  );
};

export default SharedTimesheets;