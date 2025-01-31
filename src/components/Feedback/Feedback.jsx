"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Send, CheckCircle2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      const result = await response.json()

      if (result.acknowledged) {
        setIsSubmitted(true)
        toast({
          title: "Feedback Received",
          description: "Thank you for your valuable input!",
          duration: 5000,
        })
        reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "bg-white border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 transition-all"
  const labelClasses = "absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all"

  return (
    <section className="container my-8 mx-auto px-4 py-16 bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-5xl mx-auto shadow-xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400"></div>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute top-2 right-6 bg-yellow-400 rounded-full p-3 shadow-lg"
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      Illuminate Us
                      <span className="ml-2 text-yellow-500">✨</span>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="relative">
                        <Input
                          {...register("name", { required: "Name is required" })}
                          placeholder="Your Name"
                          className={`${inputClasses} pl-10`}
                        />
                        <label className={labelClasses}>Name</label>
                        <span className="absolute left-3 top-3 text-yellow-500">👤</span>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div className="relative">
                        <Input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          placeholder="Your Email"
                          className={`${inputClasses} pl-10`}
                        />
                        <label className={labelClasses}>Email</label>
                        <span className="absolute left-3 top-3 text-yellow-500">✉️</span>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="relative">
                        <Textarea
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 4,
                              message: "Message must be at least 4 characters long",
                            },
                          })}
                          placeholder="Your Message"
                          className={`${inputClasses} pl-10`}
                          rows={4}
                        />
                        <label className={labelClasses}>Message</label>
                        <span className="absolute left-3 top-3 text-yellow-500">💬</span>
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        <span className="ml-2">{isSubmitting ? "Sending..." : "Share Your Brilliance"}</span>
                      </Button>
                    </form>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Image
                        src="/assets/images/team-ashroy.jpg"
                        alt="Feedback Illustration"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                      />
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle2 className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You! ✨</h2>
            <p className="text-gray-600 mb-6">
              Your insights are like rays of sunshine, brightening our day and guiding our path forward.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Share More Thoughts
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Feedback

