import React, { useEffect, useState } from 'react';
import { X, ChevronDown, UserCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { shareTimesheetEntry } from '@/store/slice/timesheetSlice';
import { closePopup } from '@/store/slice/popupSlice';

const ProjectAccessManagement = ({ timesheetId }: { timesheetId: string }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('Can view');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState<any>([
    { id: 1, name: 'Luis Alonso Otero Seminario', email: 'alonsoooteroseminario@gmail.com', role: 'Owner', avatar: '/api/placeholder/40/40' },
  ]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (email) {
      try {
        const resultAction = await dispatch(shareTimesheetEntry({ timesheetId, emailToShare: email }));
        if (shareTimesheetEntry.fulfilled.match(resultAction)) {
          setUsers((prevUsers: any) => [
            ...prevUsers,
            { 
              id: Date.now(), 
              name: email, 
              email, 
              role: accessLevel, 
              avatar: null 
            }
          ]);
          setEmail('');
          setSuccess('Document shared successfully!');
        } else {
          throw new Error('Failed to share document');
        }
      } catch (error: any) {
        console.error('Failed to share document:', error);
        setError(error.message || 'Failed to share document. Please try again.');
      }
    }
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    handleInvite(e);
  };

  useEffect(() => {
    console.log('email:', email);
  }, [email]);


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
        <form className="flex" onSubmit={handleShareSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-grow bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {accessLevel} <ChevronDown size={16} className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                    onClick={() => {
                      setAccessLevel('Can view');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Can view
                  </button>
                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white w-full text-left"
                    onClick={() => {
                      setAccessLevel('Can edit');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Can edit
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            type="submit"
          >
            Invite
          </button>
        </form>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      
      <ul className="space-y-4">
        {users.map((user: any) => (
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