"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, MessageSquare, Phone, Mail } from "lucide-react"

const FeedbackCard = ({ feedback, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12 bg-yellow-200">
          <AvatarFallback className="text-yellow-500 font-semibold">
            {feedback.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{feedback.name}</CardTitle>
          <p className="text-sm text-gray-500 flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            {feedback.email}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2 flex items-center">
          <Phone className="w-4 h-4 mr-1" />
          {feedback.phone}
        </p>
        <p className="text-gray-700">
          <MessageSquare className="w-4 h-4 inline mr-2 text-yellow-500" />
          {feedback.message}
        </p>
      </CardContent>
    </Card>
  </motion.div>
)

const SkeletonCard = () => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
)

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedback")
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks")
        }
        const data = await response.json()
        setFeedbacks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">Feedback from Our Community</h1>
        <p className="text-xl text-gray-600">Discover what people are saying about Ashroy and our initiatives</p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard key={feedback._id} feedback={feedback} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 mx-auto text-yellow-500 animate-spin mb-4" />
          <p className="text-xl text-gray-600">No feedbacks available at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default FeedbacksPage

