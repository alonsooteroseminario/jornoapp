'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import Navigation from '../components/Navigation';
import { AllDocuments } from '../components/AllDocuments';
import { selectUser } from '@/store/slice/userSlice';

const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="min-h-screen flex flex-col bg-gray-600">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <Profile /> */}
        {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <div className="mt-8">
            <AllDocuments />
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardPage;