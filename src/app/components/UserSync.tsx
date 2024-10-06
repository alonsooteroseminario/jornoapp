'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slice/userSlice';


const UserSync = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id }),
          });
          const userData = await response.json();
          console.log('userData:', userData);
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };
    syncUser();
  }, [user, dispatch]);

  return null; // This component doesn't render anything
};

export default UserSync;