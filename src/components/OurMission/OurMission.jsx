"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Smile, Heart, Sun, Users } from "lucide-react"

const missionPoints = [
  { icon: Smile, text: "Spreading joy through every smile" },
  { icon: Heart, text: "Offering unwavering support in all situations" },
  { icon: Sun, text: "Brightening lives, one day at a time" },
  { icon: Users, text: "Building a community of happiness and resilience" },
]

export default function OurMission() {
  return (
    <section id="mission" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a journey to create a world filled with smiles, offering support and spreading joy in every
            situation.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-yellow-400">Smiles That Change Lives</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  At the heart of our mission is a simple yet powerful goal: to bring smiles to faces and warmth to
                  hearts. We believe in the transformative power of a smile and the strength that comes from unwavering
                  support. In every situation, whether challenging or joyous, we stand by your side, ready to uplift,
                  encourage, and spread happiness.
                </p>
              </CardContent>
              <div className="h-2 bg-yellow-400"></div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-yellow-400 rounded-full p-3">
                  <point.icon className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{point.text}</h4>
                  <p className="text-gray-600">
                    We're committed to {point.text.toLowerCase()}, ensuring that our support reaches every corner of the
                    community, making a lasting positive impact.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

