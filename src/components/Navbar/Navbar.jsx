"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, Home, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/variables/variables";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleInvolve = () => {
    router.push('/login');
  };

  if (pathname === '/dashboard') return null;

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href={'/'} 
            className="flex items-center space-x-2 text-yellow-400"
          >
            {/* <Home className="h-6 w-6" /> */}
            <Image alt="logo" width={50} height={50} src={'/ashroy.jpg'}/>
            <span className="text-2xl font-bold">Ashroy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item?.path}
                  className="text-slate-600 hover:text-yellow-400 transition-colors font-medium"
                >
                  {item?.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {session?.status === 'authenticated' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <span className="font-medium capitalize">{session?.data?.user?.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleInvolve}
                  className="bg-yellow-400 text-white hover:bg-yellow-500"
                >
                  Get Involved
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item?.path}
                    onClick={() => setOpen(false)}
                    className="text-slate-600 hover:text-yellow-400 transition-colors font-medium py-2"
                  >
                    {item?.name}
                  </Link>
                ))}
                {session?.status === 'authenticated' ? (
                  <div className="flex flex-col space-y-4 pt-4 border-t">
                    <Link 
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="font-medium capitalize text-slate-600 hover:text-yellow-400"
                    >
                      {session?.data?.user?.name}
                    </Link>
                    <Button 
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      handleInvolve();
                      setOpen(false);
                    }}
                    className="bg-yellow-400 text-white hover:bg-yellow-500 w-full mt-4"
                  >
                    Get Involved
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;