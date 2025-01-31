"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Calendar,
  Users,
  DollarSign,
  Heart,
  Briefcase,
  Clock,
  CalendarPlus,
  FolderPlus,
  MessageSquareQuote,
  CalendarIcon as CalendarSync,
} from "lucide-react"

import { ErrorMessage } from "@/components/Error/ErrorMessage"
import { UnauthenticatedMessage } from "@/components/Unauthenticated/UnauthenticatedMessage"
import Button from "@/components/Button/Button"
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout"
import { DashboardCard } from "@/components/DashboardCard/DashboardCard"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const [volunteers, setVolunteers] = useState(0)
  const [sponsors, setSponsors] = useState(0)
  const [events, setEvents] = useState(0)
  const [donations, setDonations] = useState(0)
  const [contributions, setContributions] = useState(0)
  const [upcoming, setUpcoming] = useState(0)
  const fetchEvents = async () => {
    fetch("/api/manageEvents")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.length)
        const totalDonation = data.reduce((sum, item) => sum + Number.parseFloat(item.totalFundRaised), 0);
        const helped = data.reduce((sum, item) => sum + (parseFloat(item.totalDistribution)), 0);
        const futureEvents = data.filter(item => item.status === 'upcoming')
        setUpcoming(futureEvents.length)
        setContributions(helped)
        setDonations(totalDonation)
      })
  }
  const fetchMembers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        const volunteerMembers = data.filter((item) => item.role === "volunteer")
        const sponsorMembers = data.filter((item) => item.role === "sponsor")
        setVolunteers(volunteerMembers.length)
        setSponsors(sponsorMembers.length)
      })
  }
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/users?email=${session.user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data")
          return res.json()
        })
        .then((data) => {
          setUser(data)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
      fetchEvents()
      fetchMembers()
    } else if (status === "unauthenticated") {
      setLoading(false)
    }
  }, [status, session?.user?.email])

  if (status === "loading" || loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (status === "unauthenticated") {
    return <UnauthenticatedMessage />
  }
  const adminActions = [
    {
      name: "all members",
      path: "/dashboard/allMembers",
      icon: Users,
    },
    {
      name: "add new project",
      path: "/dashboard/newProject",
      icon: FolderPlus,
    },
    {
      name: "add new event",
      path: "/dashboard/newEvent",
      icon: CalendarPlus,
    },
    {
      name: "feedbacks",
      path: "/dashboard/feedbacks",
      icon: MessageSquareQuote,
    },
    {
      name: "manage events",
      path: "/dashboard/manageEvents",
      icon: CalendarSync,
    },
  ]
  return (
    <DashboardLayout user={user}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Here's an overview of your {user?.role} dashboard.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {user?.role === "admin" && user?.status === "approved" && (
            <>
              <DashboardCard
                title="Total Volunteers"
                value={volunteers}
                icon={<Users className="h-8 w-8 text-blue-500" />}
                description="15 new volunteers this month"
              />
              <DashboardCard
                title="Total Sponsors"
                value={sponsors}
                icon={<Users className="h-8 w-8 text-green-500" />}
                description="15 new sponsors this month"
              />
              <DashboardCard
                title="Total Events"
                value={events}
                icon={<Briefcase className="h-8 w-8 text-green-500" />}
                description="3 projects completed this year"
              />
              <DashboardCard
                title="Total Donations"
                value={donations}
                icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
                description="25% increase from last quarter"
              />
            </>
          )}
          {user?.role === "sponsor" && user?.status === "approved" && (
            <>
              <DashboardCard
                title="Total Donations"
                value={donations}
                icon={<DollarSign className="h-8 w-8 text-green-500" />}
                description="10% increase from last month"
              />
              <DashboardCard
                title="Event Supported"
                value={events}
                icon={<Briefcase className="h-8 w-8 text-blue-500" />}
                description="2 new projects this month"
              />
              <DashboardCard
                title="Lives Impacted"
                value={contributions}
                icon={<Heart className="h-8 w-8 text-red-500" />}
                description="Through your contributions"
              />
            </>
          )}
          {user?.role === "volunteer" && user?.status === "approved" && (
            <>
              <DashboardCard
                title="Hours Volunteered"
                value="120"
                icon={<Clock className="h-8 w-8 text-blue-500" />}
                description="15 hours this week"
              />
              <DashboardCard
                title="Upcoming Events"
                value={upcoming}
                icon={<Calendar className="h-8 w-8 text-purple-500" />}
                description="Next event in 3 days"
              />
              <DashboardCard
                title="Team Members"
                value={volunteers}
                icon={<Users className="h-8 w-8 text-yellow-500" />}
                description="2 new members this month"
              />
            </>
          )}
          {(!user?.status || user?.status !== "approved") && (
            <h2 className="text-4xl col-span-full">You are not approved as a {user?.role}</h2>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {user?.role === "admin" && user?.status === "approved" && (
            <Card>
              <CardHeader>
                <CardTitle>All actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {adminActions.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <Link href={item.path} className="text-xl font-semibold capitalize">
                          {item?.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {user?.status === "approved" && (user?.role === "volunteer" || user?.role === "sponsor") && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {user?.role === "sponsor" && "Donated to Project X"}
                          {user?.role === "volunteer" && "Volunteered for Event Y"}
                          {/* {user?.role === "admin" && "Approved new volunteer application"} */}
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {user?.role === "admin" && user?.status === "approved" && (
                  <>
                    <Button handler={() => router.push("/dashboard/manageEvents")}>Create New Event</Button>
                    <Button handler={() => router.push("/dashboard/projects")}>Create New Project</Button>
                    <Button handler={() => router.push("/dashboard/manageEvents")}>Create Upcoming Event</Button>
                    <Button handler={() => router.push("/dashboard/allMembers")}>Manage All Members</Button>
                    <Button>Generate Reports</Button>
                  </>
                )}
                {user?.role === "sponsor" && user?.status === "approved" && (
                  <>
                    <Button>Make a Donation</Button>
                    <Button handler={() => router.push("/dashboard/impact")}>View Impact Report</Button>
                    <Button handler={() => router.push("/projects")}>Explore Projects</Button>
                  </>
                )}
                {user?.role === "volunteer" && user?.status === "approved" && (
                  <>
                    <Button>Make a Donation</Button>
                    <Button handler={() => router.push("/dashboard/impact")}>View Impact Report</Button>
                    <Button handler={() => router.push("/projects")}>Explore Projects</Button>
                    <Button handler={() => router.push("/dashboard/feedback")}>View Feedback</Button>
                  </>
                )}
                {(!user?.status || user?.status !== "approved") && (
                  <p className="mt-4 col-span-2">
                    Actions will appear after your request as a {user?.role} is accepted
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

const DashboardSkeleton = () => (
  <DashboardLayout user={{ name: "Loading...", role: "Loading..." }}>
    <div className="space-y-6">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
)

export default Dashboard

