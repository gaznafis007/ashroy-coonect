"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const images = [
  { src: "/assets/images/1.jpg", width: 300, height: 400 },
  { src: "/assets/images/2.jpg", width: 400, height: 300 },
  { src: "/assets/images/3.jpg", width: 300, height: 500 },
  { src: "/assets/images/4.jpg", width: 500, height: 300 },
  { src: "/assets/images/5.jpg", width: 400, height: 400 },
  { src: "/assets/images/6.jpg", width: 300, height: 300 },
  { src: "/assets/images/7.jpg", width: 300, height: 500 },
  { src: "/assets/images/8.jpg", width: 300, height: 400 },
  { src: "/assets/images/9.jpg", width: 400, height: 300 },
  { src: "/assets/images/10.jpg", width: 400, height: 400 },
  { src: "/assets/images/11.jpg", width: 500, height: 300 },
  { src: "/assets/images/12.jpg", width: 300, height: 400 },
]

const GalleryImage = ({ src, width, height, setSelectedImage }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        width: "100%",
        paddingBottom: `${(height / width) * 100}%`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedImage({ src, width, height })}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt="Gallery image"
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
    </motion.div>
  )
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [columns, setColumns] = useState(3)
  const galleryRef = useRef(null)

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  const getColumnImages = (columnIndex) => {
    return images.filter((_, index) => index % columns === columnIndex)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-yellow-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Smiles
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-center mb-12 text-gray-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A tapestry of joy, woven with moments of hope
        </motion.p>
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(columns)].map((_, columnIndex) => (
            <div key={columnIndex} className="flex flex-col space-y-4">
              {getColumnImages(columnIndex).map((image, index) => (
                <GalleryImage key={index} {...image} setSelectedImage={setSelectedImage} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt="Selected gallery image"
                width={selectedImage.width * 1.5}
                height={selectedImage.height * 1.5}
                objectFit="contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

