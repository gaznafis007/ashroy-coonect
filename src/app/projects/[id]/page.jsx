"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Gift, Calendar, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"


const ProjectDetails =() => {
  const params = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch project details")
        return res.json()
      })
      .then((data) => {
        // console.log(data, "project")
        setProject(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      
    )
  }

  if (error) {
    return (
      
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      
    )
  }

  if (!project) return null

  return (
    
      <div className="container mx-auto py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={project.coverImage || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <Badge variant="secondary" className="mb-4 capitalize">
                {project?.season}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              {project.subheading && <p className="text-lg text-gray-200">{project.subheading}</p>}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
                <CardDescription>Our motivation and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-wrap">{project.motivation}</p>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Fundraising Goal</p>
                      <p className="text-2xl font-bold">${project.goal}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Season</p>
                      <p className="text-lg capitalize">{project.season}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-yellow-50">
                <CardHeader>
                  <CardTitle>Support This Project</CardTitle>
                  <CardDescription>Make a difference today</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push('/donate')} className="w-full" size="lg">
                    <Gift className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    
  )
}

export default ProjectDetails;

