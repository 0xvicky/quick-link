"use client";
import {useState} from "react";
import toast from "react-hot-toast";
import {FaCopy} from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";

const Shortner = () => {
  const [urlInfo, setUrlInfo] = useState({
    longUrl: "",
    siteName: ""
  });

  const displaySnackbar = (shortUrl: string) => {
    toast.custom(
      t => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-exit"
          } max-w-md w-full bg-gray-900 shadow-lg  rounded-lg pointer-events-auto flex ring-1 ring-white ring-opacity-5 transition-all duration-500`}>
          <div className='flex-1 w-0 p-4'>
            <div className='flex items-start'>
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium text-white'>Url Generated🥳</p>
                <p className='mt-1 text-sm font-semibold flex items-center gap-x-4 bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent'>
                  <a
                    href={shortUrl}
                    target='_blank'>
                    {shortUrl}
                  </a>
                  <CopyToClipboard text={shortUrl}>
                    <FaCopy className='text-orange-600 cursor-pointer' />
                  </CopyToClipboard>
                </p>
              </div>
            </div>
          </div>
          <div className='flex border-l border-gray-200'>
            <button
              onClick={() => toast.dismiss(t.id)}
              className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-500 hover:text-orange-600 hover:ring-orange-500'>
              Close
            </button>
          </div>
        </div>
      ),
      {position: "top-center", duration: Infinity}
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (urlInfo.longUrl === "" || urlInfo.siteName === "") {
        toast.error("Empty fields are not allowed");
        return;
      }
      if (urlInfo.siteName.length > 25) {
        throw toast.error("Please enter name smaller than 25 characters");
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

      const res = await fetch("api/genLink", options);

      toast.dismiss();
      const data = await res.json();
      if (res.status === 201) {
        displaySnackbar(data.url.shortUrl);
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(`Error occured while generating url:${error}`);
    } finally {
      setUrlInfo({longUrl: "", siteName: ""});
    }
  };
  return (
    <div className='mt-48 space-y-10'>
      <h1 className='mt-2 font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center'>
        Shortener
      </h1>
      <div className='flex flex-col items-center justify-center space-y-10 h-full'>
        <input
          type='text'
          value={urlInfo.siteName}
          onChange={e => setUrlInfo({...urlInfo, siteName: e.target.value})}
          className='p-2 w-4/6 outline-none ring-1 ring-yellow-300 focus:ring-2 focus:ring-yellow-500 bg-transparent text-white rounded-md h-fit transition-all duration-300'
          placeholder='Enter Site Name'
          required
        />
        <input
          type='text'
          value={urlInfo.longUrl}
          onChange={e => setUrlInfo({...urlInfo, longUrl: e.target.value})}
          className='p-2 w-4/6 outline-none ring-1 ring-yellow-300 focus:ring-2 focus:ring-yellow-500 text-white bg-transparent rounded-md h-fit transition-all duration-300'
          placeholder='Enter Link'
          required
        />
        <button
          className=' bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 px-2 p-2 rounded-md hover:outline transition-all duration-200 hover:outline-orange-800'
          type='button'
          onClick={handleSubmit}>
          Generate Short Linkx
        </button>
      </div>
    </div>
  );
};

export default Shortner;
