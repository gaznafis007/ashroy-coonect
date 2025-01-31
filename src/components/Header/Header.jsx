"use client"
import { motion } from "framer-motion"
import Button from "../Button/Button"
import { useRouter } from "next/navigation"


export default function Hero() {
  const router = useRouter()
  return (
    // <section className="bg-primary text-primary-foreground py-20">
    //   <div className="container mx-auto px-4">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8 }}
    //       className="text-center"
    //     >
    //       <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">Empowering Smile with <span className="text-yellow-400">Ashroy</span></h1>
    //       <p className="text-xl mb-8">Join us in our mission to create positive change in our community.</p>
    //       <div className="flex flex-row space-x-2 md:space-x-4 justify-center">
    //       <Button>
    //         Donate Now
    //       </Button>
    //       <Button style={'border border-yellow-400 text-yellow-400'} bg={'bg-transparent'} >
    //         Join us
    //       </Button>
    //       </div>
    //     </motion.div>
    //   </div>
    // </section>
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-cover bg-center z-0" 
      style={{backgroundImage: "url('/assets/images/team-ashroy.jpg')"}}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 10, ease: "easeOut" }}
    />
    <div className="absolute inset-0 bg-black opacity-50 z-10" />
    <div className="relative z-20 max-w-4xl mx-auto px-4">
      <motion.h1 
        className="text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to <span className="text-yellow-400">Ashroy</span>
      </motion.h1>
      <motion.p 
        className="text-2xl mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Illuminating Lives, One Smile at a Time
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button onClick={() => router.push('/login')} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl px-10 py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
          Join Our Cause
        </Button>
      </motion.div>
    </div>
  </section>
  )
}

