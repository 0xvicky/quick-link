"use client";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSignUp) {
      toast.loading("Creating account...");
      const options = {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          image: "123fsaf"
        })
      };
      fetch("api/auth/register", options).then(res =>
        res.json().then(async data => {
          console.log(res.status);
          console.log(data);
          if (res.status === 201) {
            await signIn("credentials", formData);
            router.push("/");
          }
        })
      );
    } else {
      toast.loading("Logging in...");
      console.log(formData);
      const res = await signIn("credentials", {
        ...formData,
        redirect: false
      });
      toast.dismiss();
      if (res?.status === 200) {
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        console.log(res);
        toast.error(`${res?.error}`);
      }
    }
  };

  return (
    <section className='w-full max-w-full flex flex-col items-center mt-20'>
      <h1 className='mt-2 font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center'>
        Authentication
      </h1>
      <form
        onSubmit={handleSubmit}
        className='mt-8 w-full max-w-md flex flex-col gap-5'>
        {isSignUp && (
          <div className='flex flex-col gap-4'>
            <label className='flex flex-col'>
              <span className='font-satoshi font-semibold text-base  text-white'>
                Username
              </span>
              <input
                type='text'
                placeholder='Username'
                required
                className='p-2 border rounded-md text-white bg-transparent'
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </label>
          </div>
        )}
        <label className='flex flex-col '>
          <span className='font-satoshi font-semibold text-base  text-white'>Email</span>
          <input
            type='text'
            placeholder='Enter Email'
            required
            className='p-2 border rounded-md bg-transparent text-white'
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </label>
        <label className='flex flex-col'>
          <span className='font-satoshi font-semibold text-base  text-white'>
            Password
          </span>
          <input
            type='password'
            placeholder='Enter Password'
            required
            className='p-2 border rounded-md bg-transparent text-white'
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </label>
        {isSignUp && (
          <label className='flex flex-col'>
            <span className='font-satoshi font-semibold text-base  text-white'>
              Confirm Password
            </span>
            <input
              type='password'
              placeholder='Confirm Password'
              required
              className='p-2 border rounded-md bg-transparent text-white'
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </label>
        )}
        <div className='flex flex-col items-center gap-4'>
          <button
            type='button'
            className='text-gray-600'
            onClick={e => {
              e.preventDefault();
              setIsSignUp(prev => !prev);
            }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span className='pl-2 py-1.5 text-base bg-gradient-to-br from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold rounded-full'>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </button>
          {isSignUp ? (
            <button
              type='submit'
              className='px-5 py-1.5 text-sm bg-gradient-to-br from-orange-800 via-red-500 to-yellow-500 rounded-md text-white'>
              Sign Up
            </button>
          ) : (
            <button
              type='submit'
              className='px-5 py-1.5 text-sm bg-gradient-to-br from-orange-800 via-red-500 to-yellow-500 rounded-md text-white'>
              Sign In
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Auth;
