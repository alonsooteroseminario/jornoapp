'use client';

import { useAppSelector } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import UserManagement from '../components/UserManagement';
import { selectUser } from '@/store/slice/userSlice';

const AdminPage = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [user.role, router]);

  if (user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <UserManagement />
      </main>
    </div>
  );
};

export default AdminPage;