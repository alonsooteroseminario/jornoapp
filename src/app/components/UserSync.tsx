'use client';

import { useUser, SignedIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

const syncUser = async (userId: string) => {
  try {
    const response = await axios.post('/api/user', { userId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error syncing user:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to sync user');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

const UserSync = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleSync = async () => {
      if (isLoaded && user) {
        try {
          await syncUser(user.id);
          router.push('/dashboard'); // Redirect to dashboard or home page
        } catch (error) {
          console.error('Failed to sync user:', error);
          // Handle the error (e.g., show an error message to the user)
        }
      }
    };

    handleSync();
  }, [isLoaded, user, router]);

  return null; // This component doesn't render anything
};

const UserSyncWrapper = () => (
  <SignedIn>
    <UserSync />
  </SignedIn>
);

export default UserSyncWrapper;