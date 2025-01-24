"use client"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const events = [
  {
    title: "Community Cleanup",
    date: "June 15, 2023",
    description: "Join us for a day of cleaning up our local parks.",
  },
  {
    title: "Fundraising Gala",
    date: "July 22, 2023",
    description: "An evening of dinner and entertainment to support our cause.",
  },
  {
    title: "Education Workshop",
    date: "August 5, 2023",
    description: "Learn about sustainable practices for a greener future.",
  },
]

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <div className="p-6">
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

