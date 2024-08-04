"use client";
import {useState} from "react";
import toast from "react-hot-toast";

const Shortner = () => {
  const [urlInfo, setUrlInfo] = useState({
    longUrl: "",
    siteName: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (urlInfo.longUrl === "" || urlInfo.siteName === "") {
      toast.error("Empty fields are not allowed");
      return;
    }
    toast.loading("Generating...");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        longUrl: urlInfo.longUrl,
        siteName: urlInfo.siteName
      })
    };

    try {
      const res = await fetch("api/genLink", options);

      // console.log(res);
      toast.dismiss();
      const data = await res.json();
      if (res.status === 201) {
        toast.success(`URL generated`);
      } else {
        toast.error(data?.msg);
      }
      console.log(data.url);
    } catch (error) {
      console.log(`Error occured while generating url:${error}`);
    }
  };
  return (
    <div className='mt-48 space-y-10'>
      <h1 className='mt-2 font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center'>
        Shortener
      </h1>
      <form className='flex flex-col items-center justify-center space-y-10 h-full'>
        <input
          type='text'
          onChange={e => setUrlInfo({...urlInfo, siteName: e.target.value})}
          className='p-2 w-4/6 outline-none ring-1 ring-yellow-300 focus:ring-2 focus:ring-yellow-500 bg-transparent text-white rounded-md h-fit transition-all duration-300'
          placeholder='Enter Site Name'
          required
        />
        <input
          type='text'
          onChange={e => setUrlInfo({...urlInfo, longUrl: e.target.value})}
          className='p-2 w-4/6 outline-none ring-1 ring-yellow-300 focus:ring-2 focus:ring-yellow-500 text-white bg-transparent rounded-md h-fit transition-all duration-300'
          placeholder='Enter Link'
          required
        />
        <button
          className=' bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 px-2 p-2 rounded-md hover:outline transition-all duration-200 hover:outline-orange-800'
          type='submit'
          onClick={handleSubmit}>
          Generate Short Linkx
        </button>
      </form>
    </div>
  );
};

export default Shortner;
