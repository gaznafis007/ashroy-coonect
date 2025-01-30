"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Lightbulb, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const AboutUs = () => {
    const [selectedValue, setSelectedValue] = useState("mission")
    const router = useRouter()

  const content = {
    mission: {
      title: "Our Mission",
      description:
        "To illuminate lives and create lasting smiles through compassionate action and community empowerment.",
      icon: Heart,
    },
    team: {
      title: "Our Team",
      description:
        "A diverse group of passionate individuals united by the common goal of making a positive impact in our community.",
      icon: Users,
    },
    vision: {
      title: "Our Vision",
      description:
        "A world where every individual has the opportunity to thrive, smile, and contribute to their community's wellbeing.",
      icon: Lightbulb,
    },
  }
  const IconComponent = content[selectedValue].icon;
  const MotionCard = motion(Card)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-yellow-800 mb-8">About Ashroy</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/assets/images/23.jpg"
              alt="About Ashroy"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-gray-700 mb-6">
              Ashroy is more than just a non-profit organization; we are a movement of compassion and hope. Founded in
              2010, we have been dedicated to uplifting underprivileged communities through innovative programs and
              heartfelt initiatives.
            </p>
            <p className="text-lg text-gray-700">
              Our journey is marked by countless smiles, transformed lives, and strengthened communities. With every
              project we undertake, we strive to create lasting impact and foster a sense of unity and empowerment.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(content).map((key) => (
            <Button
              key={key}
              variant={selectedValue === key ? "default" : "outline"}
              onClick={() => setSelectedValue(key)}
              className="capitalize"
            >
              {key}
            </Button>
          ))}
        </div>

        <MotionCard
          key={selectedValue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {content[selectedValue].icon &&
                (<IconComponent className="h-8 w-8 text-yellow-600 mr-4" />)}
              <h2 className="text-2xl font-semibold text-gray-800">{content[selectedValue].title}</h2>
            </div>
            <p className="text-gray-600">{content[selectedValue].description}</p>
          </CardContent>
        </MotionCard>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button onClick={() =>router.push('/') } className="group" size="lg">
            Join Our Cause
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutUs

