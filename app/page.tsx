"use client";
import {Navbar, Shortner} from "@/components";

export default function Home() {
  return (
    <main className='h-screen flex flex-col '>
      <Navbar />
      <Shortner />
    </main>
  );
}
