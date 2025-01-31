"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Loader2, Calendar, DollarSign, Users, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const EventDetails = ({ params }) => {
  const { id } = params
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/manageEvents/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch event details")
      }
      const data = await response.json()
      setEvent(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvent()
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

  if (!event) {
    return (
      <div className="text-center py-10">
        <p>No event found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden mb-8">
            <div className="relative h-96">
              <Image
                src={event.coverImage || "/placeholder.svg"}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Badge className="mb-2" variant={event.status === "upcoming" ? "default" : "secondary"}>
                  {event.status}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg">{event.project}</p>
              </div>
            </div>
            <CardContent className="grid gap-6 md:grid-cols-2 p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About This Event</h2>
                <p className="text-gray-600">{event.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1">
                    <Calendar className="mr-2 h-5 w-5 text-yellow-500" />
                    <span>{(new Date(event.eventDate).toLocaleDateString())}</span>
                  </div>
                  <div className="flex items-center bg-green-100 rounded-full px-3 py-1">
                    <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                    <span>Funds Raised: ${event.totalFundRaised}</span>
                  </div>
                  <div className="flex items-center bg-blue-100 rounded-full px-3 py-1">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    <span>People Helped: {event.totalDistribution}</span>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Event Impact</CardTitle>
                  <CardDescription>See the difference we're making</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Funds Raised</span>
                        <span className="text-sm font-medium">
                          {event.totalFundRaised}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${Math.min((event.totalFundRaised / 100000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">People Helped</span>
                        <span className="text-sm font-medium">
                          {event.totalDistribution}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${Math.min((event.totalDistribution / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {event.images.map((img, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Event image ${index + 1}`}
                  width={300}
                  height={200}
                  objectFit="cover"
                  className="rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="relative">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected event image"
                width={800}
                height={600}
                objectFit="contain"
                className="rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  )
}

export default EventDetails

