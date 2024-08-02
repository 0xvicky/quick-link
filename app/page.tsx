"use client";

import Link from "next/link";
import {Shortner} from "@/components";
export default function Home() {
  return (
    <div className=' min-h-full'>
      <Link href='/'>
        <Shortner />
      </Link>
    </div>
  );
}
