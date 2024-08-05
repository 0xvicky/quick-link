"use client";
import React, {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {HamburgerProps} from "@/types";
import {ScaleLoader} from "react-spinners";
import {useParams} from "next/navigation";

const Hamburger = ({signOut}: HamburgerProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();
  const param = useParams();
  const username = session?.data?.user.username;
  const email = session?.data?.user.email;

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [param, session]);

  return session && username && email ? (
    <div className='relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:hidden'>
      <button
        type='button'
        className='flex text-sm rounded-full md:me-0 active:ring active:ring-orange-500'
        id='user-menu-button'
        aria-expanded={isDropdownOpen}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span className='sr-only'>Open user menu</span>
        <div className='rounded-full w-10 h-10 border border-white flex items-center justify-center text-white capitalize text-2xl font-semibold'>
          {username && username[0]}
        </div>
      </button>
      {isDropdownOpen && (
        <div
          className='absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-600 mt-56 right-0'
          id='user-dropdown'>
          <div className='px-4 py-3'>
            <span className='block text-sm text-gray-900 dark:text-white'>
              {username}
            </span>
            <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>
              {email}
            </span>
          </div>
          <ul
            className='py-2'
            aria-labelledby='user-menu-button'>
            <li>
              <Link
                href='/dashboard'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                Dashboard
              </Link>
            </li>

            <li className=''>
              <button
                onClick={signOut}
                className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div>
      <ScaleLoader color='white' />
    </div>
  );
};

export default Hamburger;
