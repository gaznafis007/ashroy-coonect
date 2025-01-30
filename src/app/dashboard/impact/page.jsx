"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Users, Calendar, Briefcase } from "lucide-react"

const ImpactCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardHeader className={`bg-${color}-100 flex flex-row items-center justify-between space-y-0 pb-2`}>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color}-500`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </CardContent>
  </Card>
)

const ImpactPage = () => {
  const [projects, setProjects] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, eventsRes] = await Promise.all([fetch("/api/projects"), fetch("/api/manageEvents")])

        if (!projectsRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const projectsData = await projectsRes.json()
        const eventsData = await eventsRes.json()

        setProjects(projectsData)
        setEvents(eventsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  const totalProjects = projects.length
  const totalEvents = events.length
  const totalPeopleHelped = events.reduce((sum, event) => sum + (parseFloat(event.totalDistribution) || 0), 0)

  const impactData = [
    { title: "Total Projects", value: totalProjects, icon: Briefcase, color: "blue" },
    { title: "Total Events", value: totalEvents, icon: Calendar, color: "gray" },
    { title: "People Helped", value: totalPeopleHelped, icon: Users, color: "green" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-yellow-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Impact
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {impactData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImpactCard {...item} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project._id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{project.title}</span>
                    <span className="text-sm text-gray-500">{project.status}</span>
                  </div>
                  <Progress value={Math.random() * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div key={event._id} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{event.title}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(event.eventDate).toLocaleDateString()} - {event.totalDistribution} helped
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ImpactPage

