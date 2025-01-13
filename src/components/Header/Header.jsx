'use client'
import React from "react";
import headerImage from "../../assets/images/team-ashroy.jpg";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";

const Header = () => {
  const router = useRouter();
  const handleRoute = (path) => {
    router.push(path);
  };
  return (
    <header
    style={{
      background: `linear-gradient(44deg, rgba(0,0,0, 0.8), rgba(0,0,0, 0.1)), url(${headerImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
      className="md:rounded-xl mt-4 md:mt-8 md:mx-4 px-8 py-32 md:py-56"
    >
      <div className="flex flex-col space-y-3 md:items-center md:justify-center mt-8">
        <h1 className="text-5xl text-white font-bold">
          Empowering Smile with <span className="text-yellow-400">Ashroy.</span>
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Button handler={() => handleRoute("/login")}>Join us</Button>
          <Button
            handler={() => handleRoute("/donate")}
            bg={"bg-transparent border border-yellow-400 hover:bg-yellow-400"}
          >
            Donate
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
