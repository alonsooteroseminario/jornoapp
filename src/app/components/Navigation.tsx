'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';

import { SignedIn, UserButton } from "@clerk/nextjs";
import { selectUser } from '@/store/slice/userSlice';

const Navigation: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
          <Link href="/documents/new" className="hover:text-blue-200 transition-colors">
            Create Timesheet
          </Link>
          <Link href="/documents" className="hover:text-blue-200 transition-colors">
            Documents
          </Link>
          {user.role === 'ADMIN' && (
            <Link href="/admin" className="hover:text-blue-200 transition-colors">
              Admin Panel
            </Link>
          )}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;