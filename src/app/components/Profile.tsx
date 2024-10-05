'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, updateProfile } from '@/store/slice/userSlice';


const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [profileData, setProfileData] = useState(user.profile);

  useEffect(() => {
    // // Fetch profile data from API
    // const fetchProfile = async () => {
    //   const response = await fetch('/api/profile');
    //   const data = await response.json();
    //   setProfileData(data);
    //   dispatch(updateProfile(data));
    // };
    // fetchProfile();
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const updatedProfile = await response.json();
      dispatch(updateProfile(updatedProfile));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={profileData.phoneNumber || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {/* Add more input fields for other profile data */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Update Profile
      </button>
    </form>
  );
};

export default Profile;