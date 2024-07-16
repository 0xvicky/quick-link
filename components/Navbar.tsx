"use client";
import {signOut} from "next-auth/react";
const Navbar = () => {
  return (
    <div className='flex justify-between p-10 bg-gray-200'>
      {" "}
      <h2 className='text-4xl font-semibold bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent'>
        Quick Link
      </h2>
      <button
        className='rounded-md bg px-2 p-2 bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500'
        onClick={async () => {
          await signOut();
        }}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
