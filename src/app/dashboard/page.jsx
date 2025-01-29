"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Calendar,
  Users,
  DollarSign,
  Heart,
  Briefcase,
  Clock,
  ExternalLink,
  CalendarPlus,
  FolderPlus,
  MessageSquareQuote,
  CalendarSync,
} from "lucide-react";

import { ErrorMessage } from "@/components/Error/ErrorMessage";
import { UnauthenticatedMessage } from "@/components/Unauthenticated/UnauthenticatedMessage";
import Button from "@/components/Button/Button";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/users?email=${session.user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session?.user?.email]);

  if (status === "loading" || loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (status === "unauthenticated") {
    return <UnauthenticatedMessage />;
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
  ];
  return (
    <DashboardLayout user={user}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your {user?.role} dashboard.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {user?.role !== "admin" &&
            (user?.status === "approved" ? (
              user?.role === "sponsor" &&
              (<>
                <DashboardCard
                  title="Total Donations"
                  value="$12,345"
                  icon={<DollarSign className="h-8 w-8 text-green-500" />}
                  description="10% increase from last month"
                />
                <DashboardCard
                  title="Projects Supported"
                  value="23"
                  icon={<Briefcase className="h-8 w-8 text-blue-500" />}
                  description="2 new projects this month"
                />
                <DashboardCard
                  title="Lives Impacted"
                  value="1,234"
                  icon={<Heart className="h-8 w-8 text-red-500" />}
                  description="Through your contributions"
                />
              </>)(
                user?.role === "volunteer" && (
                  <>
                    <DashboardCard
                      title="Hours Volunteered"
                      value="120"
                      icon={<Clock className="h-8 w-8 text-blue-500" />}
                      description="15 hours this week"
                    />
                    <DashboardCard
                      title="Upcoming Events"
                      value="5"
                      icon={<Calendar className="h-8 w-8 text-purple-500" />}
                      description="Next event in 3 days"
                    />
                    <DashboardCard
                      title="Team Members"
                      value="12"
                      icon={<Users className="h-8 w-8 text-yellow-500" />}
                      description="2 new members this month"
                    />
                  </>
                )
              )
            ) : (
              <h2 className="text-4xl">
                You are not approved as a {user?.role}
              </h2>
            ))}

          {user?.role === "admin" && (
            <>
              <DashboardCard
                title="Total Volunteers"
                value="256"
                icon={<Users className="h-8 w-8 text-blue-500" />}
                description="15 new volunteers this month"
              />
              <DashboardCard
                title="Total Sponsors"
                value="6"
                icon={<Users className="h-8 w-8 text-green-500" />}
                description="15 new volunteers this month"
              />
              <DashboardCard
                title="Total Events"
                value="18"
                icon={<Briefcase className="h-8 w-8 text-green-500" />}
                description="3 projects completed this year"
              />
              <DashboardCard
                title="Total Donations"
                value="$87,690"
                icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
                description="25% increase from last quarter"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {user?.role === "admin" && (
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
                        <Link
                          href={item.path}
                          className="text-xl font-semibold capitalize"
                        >
                          {item?.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {user?.status === "approved" &&
            (user?.role === "volunteer" || user?.role === "sponsor") && (
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
                            {user?.role === "volunteer" &&
                              "Volunteered for Event Y"}
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
                {user?.role !== "admin" &&
                  (user?.status ? (
                    (
                      user?.role === "sponsor" && (
                        <>
                          <Button>Make a Donation</Button>
                          <Button variant="outline">View Impact Report</Button>
                          <Button variant="outline">Explore Projects</Button>
                          <Button variant="outline">Contact Support</Button>
                        </>
                      )
                    )(
                      user?.role === "volunteer" && (
                        <>
                          <Button>Sign Up for Event</Button>
                          <Button variant="outline">Log Hours</Button>
                          <Button variant="outline">View Schedule</Button>
                          <Button variant="outline">Team Chat</Button>
                        </>
                      )
                    )
                  ) : (
                    <p className="mt-4">
                      Will appear after your request as a {user?.role} accepted
                    </p>
                  ))}

                {user?.role === "admin" && (
                  <>
                    <Button>Create New Event</Button>
                    <Button onClick={() => router.push("/dashboard/project")}>Create New Project</Button>
                    <Button>Create Upcoming Event</Button>
                    <Button
                      handler={() => router.push("/dashboard/allMembers")}
                    >
                      Manage All Members
                    </Button>
                    <Button>Generate Reports</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

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
  );

export default Dashboard;
