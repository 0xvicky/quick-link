import React from "react";
import Link from "next/link";

const Dashboard = () => {
  const data = [
    {id: 1, siteName: "Example Site", shortUrl: "https://short.ly/abc123"},
    {id: 2, siteName: "Another Site", shortUrl: "https://short.ly/def456"},
    {id: 2, siteName: "Another Site", shortUrl: "https://short.ly/def456"}
    // Add more data as needed
  ];

  return (
    <div className='p-4'>
      <Link href='/'>BAck</Link>
      <table className='min-w-full divide-y divide-gray-200 mt-4'>
        <thead className='bg-gray-50'>
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
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Copy
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {index + 1}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {item.siteName}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-500'>
                <a
                  href={item.shortUrl}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {item.shortUrl}
                </a>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>Copy</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
