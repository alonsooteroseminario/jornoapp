'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slice/userSlice';
import { Users } from 'lucide-react';

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
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Users size={24} className="text-blue-500 mr-2" />
        <h2 className="text-3xl font-bold">User Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                <td className="py-3 px-4">{user.profile?.phoneNumber || 'N/A'}</td>
                <td className="py-3 px-4">{user.profile?.company || 'N/A'}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as 'ADMIN' | 'MANAGER' | 'USER')}
                    className="bg-gray-600 text-white border border-gray-500 rounded p-1"
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
    </div>
  );
};

export default UserManagement;