'use client';


import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closePopup, selectPopupIsOpen } from '@/store/slice/popupSlice';

import ProjectAccessManagement from '@/app/components/ProjectAccessManagement';

const PopupOverlay = ({ timesheetId }: { timesheetId: string }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectPopupIsOpen);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleShareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (email) {
      try {

        setEmail('');
        setSuccess('Document shared successfully!');
      } catch (error: any) {
        console.error('Error sharing document:', error);
        setError(error.message || 'Failed to share document. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          Close
        </button>
        <h2 className="text-xl font-bold text-white mb-4">Share Document</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleShareSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Enter email to share with:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Share
          </button>
        </form>
        <ProjectAccessManagement timesheetId={timesheetId} />
      </div>
    </div>
  );
};

export default PopupOverlay;