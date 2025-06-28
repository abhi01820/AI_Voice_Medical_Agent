import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

function AppHeader() {
  const menuOptions = [
    { id: 1, name: 'Home', path: '/dashboard' },
    { id: 2, name: 'History', path: '/dashboard/history' }
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow px-6 md:px-10 lg:px-20">
      <Image src="/logo.svg" alt="arcAbhi" width={200} height={100} />
      <div className="hidden md:flex gap-10 items-center">
        {menuOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <h2 className="hover:font-bold cursor-pointer transition-all">
              {option.name}
            </h2>
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  );
}

export default AppHeader;
