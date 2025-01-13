"use client";
import { useRouter } from "next/navigation";

import Button from "./Button/Button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Empowering",
      className: 'text-white'
    },
    {
      text: "Smile",
      className: 'text-white'
    },
    {
      text: "with",
      className: 'text-white'
    },
    {
      text: "Ashroy",
      className: "text-yellow-400 dark:text-yellow-400",
    },
  ];
  const router = useRouter();
  const handleRoute = (path) =>{
    router.push(path)
  }
  return (
    (<div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button handler={() =>handleRoute('/login')}>Join us</Button>
        <Button handler={() =>handleRoute('/donate')} bg={'bg-transparent border border-yellow'}>Join us</Button>
      </div>
    </div>)
  );
}




{/* <Button handler={() =>handleRoute('/login')}>Join us</Button>
        <Button handler={() =>handleRoute('/donate')} bg={'bg-transparent border border-yellow'}>Join us</Button> */}