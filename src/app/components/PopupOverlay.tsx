'use client';


import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closePopup, selectPopupIsOpen } from '@/store/slice/popupSlice';

import ProjectAccessManagement from '@/app/components/ProjectAccessManagement';

const PopupOverlay = ({ timesheetId }: { timesheetId: string }) => {
  const isOpen = useAppSelector(selectPopupIsOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <ProjectAccessManagement timesheetId={timesheetId} />
      </div>
    </div>
  );
};

export default PopupOverlay;