"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Gift, Goal, Loader2 } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects")
        return res.json()
      })
      .then((data) => {
        setProjects(data)
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
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      
    )
  }

  return (
    
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">Our Projects</h1>
          <p className="text-gray-600">Explore our ongoing and upcoming charitable initiatives</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={project?.coverImage || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="capitalize">
                      {project.season.replace(/-/g, " ")}
                    </Badge>
                    <div className="flex items-center text-yellow-600">
                      <Goal className="h-4 w-4 mr-1" />
                      <span className="font-medium">{project.goal}</span>
                    </div>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  {project.subheading && <CardDescription>{project.subheading}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{project.motivation}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() =>router.push(`/projects/${project?._id}`)} className="bg-yellow-500 hover:bg-yellow-600">View Details</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    
  )
}

