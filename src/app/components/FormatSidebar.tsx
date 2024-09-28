'use client';

import React from 'react';

const FormatSidebar = () => {
  const formatOptions = ['H1', 'H2', 'H3', 'B', 'I', 'U', '≡', '≡', '≡', '≡'];

  return (
    <aside className="w-16 bg-gray-800 p-2">
      <div className="space-y-4">
        {formatOptions.map((option, index) => (
          <button key={index} className="w-full p-2 text-center hover:bg-gray-700 rounded">
            {option}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default FormatSidebar;