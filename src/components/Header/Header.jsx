"use client"
import { motion } from "framer-motion"
import Button from "../Button/Button"


export default function Hero() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">Empowering Smile with <span className="text-yellow-400">Ashroy</span></h1>
          <p className="text-xl mb-8">Join us in our mission to create positive change in our community.</p>
          <div className="flex flex-row space-x-2 md:space-x-4 justify-center">
          <Button>
            Donate Now
          </Button>
          <Button style={'border border-yellow-400 text-yellow-400'} bg={'bg-transparent'} >
            Join us
          </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

