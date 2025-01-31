"use client"
import { motion } from "framer-motion"
import Button from "../Button/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"

const MotivationSection = () => {
  const router = useRouter()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-200 opacity-70"></div>
      <Image
        src="/assets/images/bg.jpg"
        alt="Background Pattern"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-10"
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-yellow-800 inline-block relative">
            Get Involved
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.span>
          </h2>
        </motion.div>
        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your support can create ripples of change that transform lives. Join us in our mission to bring smiles to
          underprivileged people. Every contribution, big or small, helps us create lasting impact and build a brighter
          future for all.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            handler={() => router.push("/login")}
            style="text-white text-lg px-8 py-4 md:px-10 md:py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            bg="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400"
          >
            Volunteer With Us
          </Button>
          <Button
            handler={() => router.push("/donate")}
            style="text-yellow-600 border-2 border-yellow-500 text-lg px-8 py-4 md:px-10 md:py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-slate-900 hover:shadow-lg"
            bg="bg-white hover:bg-yellow-100"
          >
            Make a Donation
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#FEF3C7"
            fillOpacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,170.7C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </section>
  )
}

export default MotivationSection

