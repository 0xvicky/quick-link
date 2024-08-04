"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {urlData} from "@/types";
import {format} from "date-fns";
import {FaCopy} from "react-icons/fa";
import {CopyToClipboard} from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import {HashLoader} from "react-spinners";

const Dashboard = () => {
  const [urlData, setUrlData] = useState<urlData[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const data = [
    {id: 1, siteName: "Example Site", shortUrl: "https://short.ly/abc123"},
    {id: 2, siteName: "Another Site", shortUrl: "https://short.ly/def456"},
    {id: 2, siteName: "Another Site", shortUrl: "https://short.ly/def456"}
    // Add more data as <needed></needed>
  ];

  const fetchUrls = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("/api/fetchUrls", options)
      .then(res => res.json())
      .then(data => setUrlData(data?.urls || []));
    setIsLoader(false);
  };
  useEffect(() => {
    setIsLoader(true);
    fetchUrls();
  }, []);

  console.log(urlData);
  return (
    <div className='p-4 '>
      <Link
        href='/'
        className='text-white text-xl'>
        Back
      </Link>
      {isLoader ? (
        <div className=' flex justify-center mt-64'>
          <HashLoader
            color='white'
            size={50}
          />
        </div>
      ) : urlData[0] !== null && urlData.length > 0 ? (
        <table className='min-w-full divide-y divide-gray-200 mt-4 bg-gray-900'>
          <thead className='bg-gray-900'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                S.No
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Site Name
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Shortened URL
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell'>
                Created On
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell'>
                Created At
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Copy
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-900 text-white divide-y divide-gray-200 transition-all duration-200'>
            {urlData?.map((item, index) => (
              <tr
                key={item?.url._id}
                className='hover:bg-gradient-to-r from-gray-900 to-gray-700 hover:text-white cursor-pointer'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  {index + 1}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm'>{item?.siteName}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-500'>
                  <a
                    href={item?.url.shortUrl}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {item?.url.shortUrl}
                  </a>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell'>
                  {format(new Date(item?.createdAt), "dd-MM-yyyy")}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell'>
                  {format(new Date(item?.createdAt), "HH:mm:ss")}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm'>
                  <CopyToClipboard text={item?.url.shortUrl}>
                    <FaCopy
                      fontSize={20}
                      onClick={() => {
                        toast.success("Url Copied");
                      }}
                    />
                  </CopyToClipboard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='flex justify-center mt-64 bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-pulse text-5xl font-bold'>
          No Urls Shortened
        </div>
      )}
    </div>
  );
};

export default Dashboard;
