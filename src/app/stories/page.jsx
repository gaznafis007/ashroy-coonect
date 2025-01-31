"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2, MessageSquare, Heart, Share2, MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

const StoriesPage = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/blogs")
      if (!res.ok) throw new Error("Failed to fetch stories")
      const data = await res.json()
      setStories(data)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to load stories. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error("Failed to post story")

      toast({
        title: "Success!",
        description: "Your story has been posted successfully.",
      })

      reset()
      fetchStories()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post your story. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">Community Stories</h1>
          <p className="text-gray-600 mb-8">
            Share your experiences and read inspiring stories from our community members.
          </p>
        </header>

        <Card className="mb-8 bg-white shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">Share Your Story</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input
                  {...register("author", { required: "Name is required" })}
                  placeholder="Your name"
                  className="flex-grow"
                />
              </div>
              {errors.author && <p className="text-sm text-red-600 mt-1">{errors.author.message}</p>}
              <Textarea
                {...register("content", { required: "Story content is required" })}
                placeholder="What's your story?"
                className="w-full min-h-[100px]"
              />
              {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Share Story
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stories yet</h3>
              <p className="text-gray-600">Be the first one to share your story!</p>
            </div>
          ) : (
            stories.map((story, index) => (
              <motion.div
                key={story.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-md">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt={story.author} />
                        <AvatarFallback>{story.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">@{story.author}</h3>
                        <p className="text-sm text-gray-500">{formatDate(story.timestamp)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-wrap">{story.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button onClick={() => setLiked(!liked)} variant="ghost" size="sm">
                      <Heart className={`h-5 w-5 mr-1 ${liked ? 'text-red-600' : ''}`} />
                      {liked ? 'Liked' : 'Like'}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-5 w-5 mr-1" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default StoriesPage

