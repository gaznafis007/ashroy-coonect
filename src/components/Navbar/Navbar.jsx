"use client";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { navItems } from "@/variables/variables";

const Navbar = () => {
  const router = useRouter()
  const handleInvolve = () =>{
    router.push('/login')
  }
  return (
    <nav className="flex flex-row items-center justify-between px-6 py-3">
      <Link href={'/'} className="text-4xl text-yellow-400 font-semibold">Ashroy</Link>
      <div className="space-x-3">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item?.path}
            className="text-slate-800 hover:text-yellow-400 font-semibold"
          >
            {item?.name}
          </Link>
        ))}
      </div>
      <div>
        <Button handler={handleInvolve}>Get Involved</Button>
      </div>
    </nav>
  );
};

export default Navbar;
