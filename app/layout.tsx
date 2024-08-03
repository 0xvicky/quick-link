import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
const inter = Inter({subsets: ["latin"]});
import {Navbar} from "@/components";
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
  title: "Quick Link",
  description: "A URL shortener app."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}  flex flex-col min-h-screen bg-gray-900`}>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <main className='flex-grow'>{children}</main>
      </body>
    </html>
  );
}
