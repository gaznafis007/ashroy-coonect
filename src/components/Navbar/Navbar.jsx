"use client";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { navItems } from "@/variables/variables";
import { FaBars } from "react-icons/fa";
import Modal from "../Modal/Modal";

const Navbar = () => {
  const router = useRouter()
  const handleInvolve = () =>{
    router.push('/login')
  }
  const [open, setOpen] = useState(false)
  return (
    <nav className="flex flex-row items-center justify-between px-6 py-3">
      <Link href={'/'} className="text-4xl text-yellow-400 font-semibold">Ashroy</Link>
      <div className="hidden md:block space-x-3">
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
      <div className="hidden md:block">
        <Button handler={handleInvolve}>Get Involved</Button>
      </div>
      <FaBars onClick={() =>setOpen(true)} className="text-xl text-yellow-400 cursor-pointer md:hidden"/>
    {
        open && <Modal setOpen={setOpen} position={'top-4 right-4'}>
            <div className="flex flex-col space-y-3">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item?.path}
            className="text-slate-800 hover:text-yellow-400 font-semibold"
          >
            {item?.name}
          </Link>
        ))}
        <Button handler={handleInvolve}>Get Involved</Button>
      </div>
        </Modal>
    }
    </nav>
  );
};

export default Navbar;
