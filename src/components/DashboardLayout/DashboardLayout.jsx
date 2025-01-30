import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Users, Calendar, BarChart, Settings, LogOut, Menu, X } from "lucide-react"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"


const adminItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "All Members", href: "/dashboard/allMembers" },
  { icon: Calendar, label: "Events", href: "/dashboard/manageEvents" },
  { icon: BarChart, label: "Impact", href: "/dashboard/impact" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];
const dashboardItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Community", href: "/dashboard/community" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: BarChart, label: "Impact", href: "/dashboard/impact" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]
const DashboardLayout = ({ children, user }) => {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-yellow-500 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
        initial={false}
        animate={{ width: isSidebarOpen ? "256px" : "0px" }}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold">
            Ashroy
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8">
        {
          user?.role === 'admin' ? (adminItems.map((item) => (
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
          )))
          :
          (dashboardItems.map((item) => (
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
          )))
        }
      </nav>
        <div className="absolute bottom-0 w-full p-4">
          <Button
            variant="outline"
            className="w-full text-white border-white hover:bg-yellow-600"
            onClick={() => router.push("/logout")}
          >
            <LogOut className="h-5 w-5 mr-2" /> Log Out
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

