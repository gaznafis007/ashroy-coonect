import { navItems } from "@/variables/variables";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-16 py-8 md:px-24 md:py-12">
      <div className="flex flex-row justify-between items-center">
      <div className="space-y-3">
        <Link href={"/"} className="text-6xl text-yellow-400 font-semibold">
          Ashroy <span className="text-xl capitalize">-the helping hand</span>
        </Link>
        <p className="text-md text-white font-thin">
          A non profiting organization works to put smile privileges everyone
        </p>
        <div className="space-x-2 text-white  text-xl flex flex-row">
          <Link className="hover:text-yellow-400" href="https://www.facebook.com/help.ashroy">
            <FaFacebook />
          </Link>
          <a className="hover:text-yellow-400" href="">
            <FaInstagram />
          </a>
          <a className="hover:text-yellow-400" href="">
            <FaXTwitter />
          </a>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item?.path}
            className="text-white hover:text-yellow-400 font-thin"
          >
            {item?.name}
          </Link>
        ))}
      </div>
      </div>
      <h2 className="text-white font-thin capitalize text-center mt-4">all rights reserved Gazi Nafis Rafi 2025</h2>
    </footer>
  );
};

export default Footer;
