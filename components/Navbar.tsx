"use client";
import {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import Button from "./Button";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  const params = useParams();
  const session = useSession();

  const username = session?.data?.user.username;
  useEffect(() => {
    setIsAuth(window.location.href.includes("/auth"));
  }, [params]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className='flex justify-between p-10 bg-gray-900 fixed w-full '>
      {" "}
      <h2 className='text-4xl font-semibold bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent'>
        Quick Link
      </h2>
      {!isAuth && (
        <>
          <Hamburger signOut={handleSignOut} />

          <div className='space-x-7 items-center hidden md:flex'>
            {username && (
              <div className='rounded-full w-10 h-10 border border-white flex items-center justify-center text-white capitalize text-2xl font-semibold'>
                {username[0]}
              </div>
            )}
            <Link href='/dashboard'>
              <Button
                btnTitle='Dashboard'
                method={() => {}}
              />
            </Link>
            <div>
              <Button
                btnTitle='Logout'
                method={handleSignOut}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
