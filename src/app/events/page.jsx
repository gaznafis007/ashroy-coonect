"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Calendar, DollarSign, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const EventCard = ({ event }) => {

  const router = useRouter()
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-xl">{event.title}</span>
            <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(event.eventDate)}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="mr-2 h-4 w-4" />
              Funds Raised: ${event.totalFundRaised}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="mr-2 h-4 w-4" />
              People Helped: {event.totalDistribution}
            </div>
          </div>
        </CardContent>
        <CardFooter>
        <Button onClick={() => router.push(`/events/${event?._id}`)} variant="outline" className="w-full">
                View Details
              </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/manageEvents")
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-yellow-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Events
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EventsPage

