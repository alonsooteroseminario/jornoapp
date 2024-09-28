'use client';

import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const CommentsSection = () => {
  const [comment, setComment] = useState('');

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="space-y-4 mb-4 h-[calc(100vh-200px)] overflow-y-auto">
        {/* Add comment components here */}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-700 rounded-l-md px-3 py-2 focus:outline-none"
        />
        <button className="bg-blue-600 text-white rounded-r-md px-3 py-2">
          <FiSend />
        </button>
      </div>
    </aside>
  );
};

export default CommentsSection;