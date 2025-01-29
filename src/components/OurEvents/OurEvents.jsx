"use client"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Snowflake, Moon } from "lucide-react"
import Link from "next/link"

const events = [
  {
    _id: 1,
    name: "Winter Smile",
    description: "Bringing warmth and joy to those in need during the cold winter months.",
    icon: Snowflake,
    date: "December 15 - January 15",
  },
  {
    _id: 2,
    name: "Eid Smile",
    description: "Celebrating the spirit of giving and community during the festive season of Eid.",
    icon: Moon,
    date: "Varies based on Islamic calendar",
  },
]

export default function OurEvents() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Projects</h2>
          <h4 className="text-2xl font-thin text-center text-slate-950 mt-2 md:mt-4">
        These are two main way to share smile with everyone where financial or
        other conditions are not the question
      </h4>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-yellow-400 bg-opacity-10 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 rounded-full p-3">
                      <event.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">{event.name}</CardTitle>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  <Link href={`/events/${event._id}`} className='px-4 py-2 rounded-full bg-yellow-400 text-slate-950 mt-4 inline-block'>View Details</Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

