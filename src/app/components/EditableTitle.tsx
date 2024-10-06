'use client';

import React, { useState, useEffect } from 'react';
import { FiEdit, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SET_DOCUMENT_NAME, selectEntryById } from '@/store/slice/timesheetSlice';

interface EditableTitleProps {

}

const EditableTitle: React.FC<EditableTitleProps> = () => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Untitled Document');



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    dispatch(SET_DOCUMENT_NAME({ id: '', name: title }));
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
          className="bg-gray-700 text-white px-2 py-1 rounded"
          autoFocus
        />
      ) : (
        <h2 className="text-lg font-semibold">{title}</h2>
      )}
      <button 
        className="text-white hover:text-gray-300"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? <FiCheck size={18} /> : <FiEdit size={18} />}
      </button>
    </div>
  );
};

export default EditableTitle;