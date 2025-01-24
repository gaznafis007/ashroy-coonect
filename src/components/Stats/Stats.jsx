"use client"
import { motion } from "framer-motion"
import ShinyText from "../ShineyText/ShineyText"

const stats = [
  { label: "Lives Impacted", value: "10,000+" },
  { label: "Volunteers", value: "500+" },
  { label: "Projects Completed", value: "100+" },
  { label: "Communities Served", value: "50+" },
]

export default function Stats() {
  return (
    <section id="impact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-yellow-400 mb-2">
                <ShinyText text={stat.value}/>
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

