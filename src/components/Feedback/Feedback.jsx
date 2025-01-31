"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback!",
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

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-yellow-800">Contact Us</CardTitle>
            <CardDescription className="text-lg text-yellow-700">
              We'd love to hear from you! Share your thoughts or suggest our next destination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
              <div>
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="bg-white/50 border-yellow-400 focus:border-yellow-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
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
                  className="bg-white/50 border-yellow-400 focus:border-yellow-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Input
                  {...register("phone", {

                  })}
                  placeholder="Phone Number"
                  className="bg-white/50 border-yellow-400 focus:border-yellow-500"
                />
              </div>
              <div>
                <Textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 4,
                      message: "Message must be at least 4 characters long",
                    },
                  })}
                  placeholder="Your Message"
                  className="bg-white/50 border-yellow-400 focus:border-yellow-500"
                  rows={4}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Feedback"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

export default Feedback

