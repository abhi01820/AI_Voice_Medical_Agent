import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function AppHeader() {
  const menuOptions = [
    { id: 1, name: "Home", path: "/dashboard" },
    { id: 2, name: "History", path: "/dashboard/history" },
  ];

  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-10 lg:px-20 bg-white dark:bg-neutral-900 shadow-md border-b border-gray-200 dark:border-neutral-800">
      <Image
        src="/logo.svg"
        alt="arcAbhi"
        width={180}
        height={80}
        className="object-contain"
      />

      <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
        {menuOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <h2 className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
              {option.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="ml-4">
        <UserButton />
      </div>
    </div>
  );
}

export default AppHeader;
