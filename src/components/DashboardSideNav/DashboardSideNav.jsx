"use client";
import Link from 'next/link';
import {motion } from "framer-motion";
import React from 'react';
import { Button } from '../ui/button';
import { Home, Users, Calendar, BarChart, Settings, LogOut, Menu, X } from "lucide-react"
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const dashboardItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Community", href: "/dashboard/community" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: BarChart, label: "Impact", href: "/dashboard/impact" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]
const handleSignOut = () =>{
    router.push("/")
    signOut();
}
const DashboardSideNav = () => {
    const router = useRouter()
    return (
        <motion.aside
        className={`w-64 bg-yellow-500 text-white`}
        initial={false}
        animate={{ width: "256px" }}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold">
            Ashroy
          </Link>
        </div>
        <nav className="mt-8">
          {dashboardItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-white hover:bg-yellow-600 ${
                router.pathname === item.href ? "bg-yellow-600" : ""
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <Button
            variant="outline"
            className="text-white border-white bg-transparent hover:bg-yellow-600"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" /> Log Out
          </Button>
        </div>
      </motion.aside>
    );
};

export default DashboardSideNav;