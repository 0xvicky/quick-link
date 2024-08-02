"use client";
import {signOut} from "next-auth/react";
import Button from "./Button";
import Link from "next/link";
const Navbar = () => {
  const handleSignOut = async () => {
    await signOut();
  };
  const handleDashboard = () => {
    return;
  };
  return (
    <div className='flex justify-between p-10 bg-gray-200'>
      {" "}
      <h2 className='text-4xl font-semibold bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent'>
        Quick Link
      </h2>
      <div className='space-x-7'>
        <Link href='/dashboard'>
          <Button
            btnTitle='Dashboard'
            method={handleDashboard}
          />
        </Link>
        <Button
          btnTitle='Logout'
          method={handleSignOut}
        />
      </div>
    </div>
  );
};

export default Navbar;
