'use client';

import DocumentListItem from "@/app/components/DocumentListItem"
import { dateConverter } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteEntry, getEntries, TimesheetEntry } from "@/store/slice/timesheetSlice";
import { selectUser } from "@/store/slice/userSlice";
import Link from "next/link"
import { useEffect } from "react";

export const AllDocuments = () => {
    const dispatch = useAppDispatch();
    const { 
        entries,
        loading,
        error,
    } = useAppSelector(state => state.timesheet);
      useEffect(() => {
        dispatch(getEntries())
          .unwrap()
          .then((entries) => {
            console.log('AllDocuments Entries fetched:', entries);
          })
          .catch((error) => {
            console.error('Error fetching entries:', error);
          });
    }, [dispatch]);
    const user = useAppSelector(selectUser);
    const handleDelete = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this document?')) {
        try {
          await dispatch(deleteEntry(id)).unwrap();
          console.log('Document deleted successfully');
        } catch (error) {
          console.error('Failed to delete document:', error);
        }
      }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
      <main className="container mx-auto px-4">
          {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-100">All documents</h2>
                <Link href="/documents/new" className="bg-gray-500 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded cursor-pointer">
                    + Start a New Timesheet
                </Link>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>Table Info</span>
                </div>
                {entries.length > 0 ? (
                    <ul className="space-y-4">
                        {entries.map((entry: TimesheetEntry) => (
                            <DocumentListItem
                                key={entry.id}
                                id={entry.id}
                                name={entry.metadata?.name || 'Untitled'}
                                createdAt={dateConverter(entry.metadata?.createdAt || '')}
                                onDelete={()=>{
                                  handleDelete(entry.id)
                                }}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-xl font-semibold">No documents found</h3>
                    </div>
                )}
            </div>
          </div>
        )}
      </main>
      );
}