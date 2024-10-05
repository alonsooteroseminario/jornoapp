'use client';

import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slice/userSlice';
import React from 'react';

import { ReactNode } from 'react';

interface RoleBasedRouteProps {
  allowedRoles: ('ADMIN' | 'MANAGER' | 'USER')[];
  children: ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles, children }) => {
  const user = useAppSelector(selectUser);

  if (!allowedRoles.includes(user.role)) {
    return <div>Access Denied</div>;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;