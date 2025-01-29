"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProjectForm } from "@/components/ProjectForm/ProjectForm"

// const ProjectForm = ({ onSubmit, initialData, onCancel = null }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialData || {},
//   })

//   const submitHandler = (data) => {
//     onSubmit(data)
//     if (!initialData) reset() // Only reset if it's a new project form
//   }

//   return (
//     <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
//       <Input {...register("title", { required: "Title is required" })} defaultValue={initialData?.title} placeholder="Project Title" />
//       {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

//       <Textarea
//         {...register("description", { required: "Description is required" })}
//         placeholder="Project Description"
//         defaultValue={initialData?.description}
//       />
//       {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

//       <Input
//         {...register("goal", {
//           required: "Goal amount is required",
//           pattern: { value: /^\d+$/, message: "Please enter a valid number" },
//         })}
//         placeholder="Goal Amount"
//         type="number"
//         defaultValue={initialData?.goal}
//       />
//       {errors.goal && <p className="text-red-500 text-sm">{errors.goal.message}</p>}

//       <div className="flex justify-end space-x-2">
//         {onCancel && (
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//         )}
//         <Button type="submit">{initialData ? "Update Project" : "Add Project"}</Button>
//       </div>
//     </form>
//   )
// }

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="capitalize">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <p className="font-semibold">Goal: {project.goal}BDT</p>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(project._id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) throw new Error("Failed to fetch projects")
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = async (projectData) => {
    // console.log(projectData)
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      })
      if (!response.ok) throw new Error("Failed to add project")
      const result = await response.json()
    if(result.acknowledged){
      fetchProjects()
      toast({
        title: "Success",
        description: "Project added successfully!",
      })
    }
      
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProject = async (projectData) => {
    try {
      // console.log(projectData)
      const response = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      })
      if (!response.ok) throw new Error("Failed to update project")
      const updatedProject = await response.json()
      if(updatedProject.modifiedCount > 0){
        fetchProjects()
        setEditingProject(null)
      toast({
        title: "Success",
        description: "Project updated successfully!",
      })
      }     
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete project")
      fetchProjects()
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
        <Button onClick={fetchProjects} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-yellow-600 mb-8">Projects</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            onSubmit={editingProject ? handleUpdateProject : handleAddProject}
            initialData={editingProject}
            onCancel={editingProject ? () => setEditingProject(null) : null}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project, idx) => (
            <ProjectCard key={project?._id ? project?._id : idx} project={project} onEdit={setEditingProject} onDelete={handleDeleteProject} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProjectsPage

