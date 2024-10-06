'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slice/userSlice';


interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  profile: {
    phoneNumber: string | null;
    company: string | null;
  } | null;
}

const UserManagement: React.FC = () => {
  const currentUser = useAppSelector(selectUser);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    };

    if (currentUser.role === 'ADMIN') {
      fetchUsers();
    }
  }, [currentUser.role]);

  const handleRoleChange = async (userId: string, newRole: 'ADMIN' | 'MANAGER' | 'USER') => {
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, role: newRole }),
    });

    if (response.ok) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } else {
      console.error('Failed to update user role');
    }
  };

  if (currentUser.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="overflow-x-auto justify-between items-center space-y-8">
      <h2 className="text-3xl font-bold">User Management</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Company</th>
            <th className="py-2 px-4 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
              <td className="py-2 px-4">{user.profile?.phoneNumber || 'N/A'}</td>
              <td className="py-2 px-4">{user.profile?.company || 'N/A'}</td>
              <td className="py-2 px-4">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as 'ADMIN' | 'MANAGER' | 'USER')}
                  className="border rounded p-1"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Manager</option>
                  <option value="USER">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;