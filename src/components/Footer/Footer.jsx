"use client"
import { navItems } from "@/variables/variables"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { motion } from "framer-motion"

const Footer = () => {
  const pathname = usePathname()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <footer
      className={
        pathname === "/dashboard" ? "hidden" : "bg-slate-900 px-6 py-12 md:px-24 md:py-16 relative overflow-hidden"
      }
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href={"/"} className="group">
              <span className="text-5xl md:text-6xl text-yellow-400 font-bold inline-block transition-transform duration-300 group-hover:scale-105">
                Ashroy
              </span>
              <span className="text-xl capitalize block mt-2 text-yellow-200 transition-colors duration-300 group-hover:text-yellow-300">
                -the helping hand
              </span>
            </Link>
            <p className="text-lg text-white font-light max-w-md leading-relaxed">
              A non-profiting organization working to put a smile on everyone's face and bring hope to the
              underprivileged.
            </p>
            <div className="space-x-4 text-white text-2xl flex flex-row">
              <motion.a
                whileHover={{ scale: 1.2, color: "#FCD34D" }}
                className="transition-colors duration-300"
                href="https://www.facebook.com/help.ashroy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#FCD34D" }}
                className="transition-colors duration-300"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "#FCD34D" }}
                className="transition-colors duration-300"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </motion.a>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-8" variants={itemVariants}>
            {navItems.map((item, idx) => (
              <motion.div key={idx} whileHover={{ x: 5 }}>
                <Link
                  href={item?.path}
                  className="text-white hover:text-yellow-400 font-light text-lg transition-colors duration-300"
                >
                  {item?.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-white font-light text-center text-sm">
            &copy; {new Date().getFullYear()} Gazi Nafis Rafi. All rights reserved.
          </p>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      ></motion.div>
    </footer>
  )
}

export default Footer

