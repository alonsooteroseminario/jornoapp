import React, { useState } from 'react';
import { X, ChevronDown, UserCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { shareTimesheetEntry } from '@/store/slice/timesheetSlice';
import { closePopup } from '@/store/slice/popupSlice';

const ProjectAccessManagement = ({ timesheetId }: { timesheetId: string }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Luis Alonso Otero Seminario', email: 'alonsoooteroseminario@gmail.com', role: 'Owner', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Mario Romero', email: 'mario_1190@hotmail.com', role: 'can edit', avatar: null },
    { id: 3, name: 'Clask Soporte', email: 'clask.sup@gmail.com', role: 'can edit', avatar: '/api/placeholder/40/40' },
  ]);

  const handleInvite = async () => {
    if (email) {
      try {
        await dispatch(shareTimesheetEntry({ timesheetId, emailToShare: email })).unwrap();
        setUsers([...users, { id: Date.now(), name: email, email, role: 'can view', avatar: null }]);
        setEmail('');
      } catch (error) {
        console.error('Failed to share document:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage who can view this project</h2>
        <button className="text-gray-400 hover:text-white" onClick={() => dispatch(closePopup())}>
          <X size={24} />
        </button>
      </div>
      
      <p className="text-gray-400 mb-6">Select which users can view and edit this document</p>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
          Email address
        </label>
        <div className="flex">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-grow bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-800 text-white px-4 py-2 flex items-center">
            can view <ChevronDown size={16} className="ml-2" />
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            onClick={handleInvite}
          >
            Invite
          </button>
        </div>
      </div>
      
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              ) : (
                <UserCircle size={40} className="text-gray-400 mr-3" />
              )}
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              {user.role === 'Owner' ? (
                <span className="text-gray-400">{user.role}</span>
              ) : (
                <>
                  <button className="text-gray-400 hover:text-white mr-2 flex items-center">
                    {user.role} <ChevronDown size={16} className="ml-1" />
                  </button>
                  <button className="text-gray-400 hover:text-white px-2 py-1 rounded">
                    Remove
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAccessManagement;