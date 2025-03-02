"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Plus, Edit, Trash, CalendarIcon, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { uploadImage, uploadImages } from "@/lib/funcs"

const ImageDropzone = ({ onDrop, files, removeFile, multiple = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-500">Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <Image
              src={URL.createObjectURL(file) || "/placeholder.svg"}
              alt="Uploaded image"
              width={100}
              height={100}
              className="rounded-md"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const EventForm = ({ onSubmit, initialData, projects, onCancel }) => {
  const [images, setImages] = useState([])
  const [image, setImage] = useState(null)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  const onDropImages = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles])
  }, [])

  const onDropImage = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0])
  }, [])

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const removeSingleImage = () => {
    setImage(null)
  }



  const submitHandler = async (data) => {
    try {
      // Upload images first
      if (images.length > 0) {
        data.images = await uploadImages(images);
      }
  
      if (image) {
        const uploadedCoverImage = await uploadImage(image);
        data.coverImage = uploadedCoverImage; // Since it's a single image
      }
  
      console.log("Final Form Data:", data);
  
      // Submit the final form
      
        onSubmit(data);
        reset();
        setImages([]);
        setImage(null);

    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  useEffect(() => {
    reset(initialData || {})
    setImages([])
    setImage(null)
  }, [initialData, reset])

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input {...register("title", { required: "Title is required" })} placeholder="Event Title" />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <Controller
        name="project"
        control={control}
        rules={{ required: "Project is required" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project.title}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.project && <p className="text-red-500 text-sm">{errors.project.message}</p>}

      <Textarea {...register("description", { required: "Description is required" })} placeholder="Event Description" />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <Controller
        name="eventDate"
        control={control}
        rules={{ required: "Event date is required" }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {field.value ? new Date(field.value).toLocaleDateString() : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                className="rounded-md border shadow p-3"
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate.message}</p>}

      <Controller
        name="status"
        control={control}
        rules={{ required: "Status is required" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

      <Input
        {...register("totalFundRaised", {
          required: "Total fund raised is required",
          pattern: { value: /^\d+$/, message: "Please enter a valid number" },
        })}
        placeholder="Total Fund Raised"
        type="number"
      />
      {errors.totalFundRaised && <p className="text-red-500 text-sm">{errors.totalFundRaised.message}</p>}

      <Input
        {...register("totalDistribution", {
          required: "Total distribution is required",
          pattern: { value: /^\d+$/, message: "Please enter a valid number" },
        })}
        placeholder="Total Distribution"
        type="number"
      />
      {errors.totalDistribution && <p className="text-red-500 text-sm">{errors.totalDistribution.message}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Multiple Images</label>
        <ImageDropzone onDrop={onDropImages} files={images} removeFile={removeImage} multiple={true} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Single Image</label>
        <ImageDropzone
          onDrop={onDropImage}
          files={image ? [image] : []}
          removeFile={removeSingleImage}
          multiple={false}
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialData ? "Update Event" : "Add Event"}</Button>
      </div>
    </form>
  )
}

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{event.title}</span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {event.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
          <p className="text-sm font-semibold mb-1">Project: {event?.project || "Unknown"}</p>
          <p className="text-sm mb-1">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
          <p className="text-sm mb-1">Funds Raised: ${event.totalFundRaised}</p>
          <p className="text-sm">Distribution: ${event.totalDistribution}</p>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(event)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(event._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const ManageEventsPage = () => {
  const [events, setEvents] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
    fetchProjects()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/manageEvents")
      if (!response.ok) throw new Error("Failed to fetch events")
      const data = await response.json()
      setEvents(data)
    } catch (err) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) throw new Error("Failed to fetch projects")
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load projects. Some event information may be incomplete.",
        variant: "destructive",
      })
    }
  }

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch("/api/manageEvents", {
        method: "POST",
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(eventData), 
      })
      if (!response.ok) throw new Error("Failed to add event")
      const res = await response.json()
      if (res.acknowledged) {
        fetchEvents()
        toast({
          title: "Success",
          description: "Event added successfully!",
        })
        setIsEventDialogOpen(false)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateEvent = async (eventData) => {
    const {_id} = editingEvent
    try {
      const response = await fetch(`/api/manageEvents/${_id}`, {
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(eventData),
      })
      if (!response.ok) {throw new Error("Failed to update event")}
      const res = await response.json()
    console.log(res)
      if (res.modifiedCount > 0) {
        console.log('updated')
        fetchEvents()
        toast({
          title: "Success",
          description: "Event updated successfully!",
        })
        setEditingEvent(null)
        setIsEventDialogOpen(false)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/manageEvents/${eventId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete event")
      const res = await response.json()
      if (res.deletedCount > 0) {
        fetchEvents()
        toast({
          title: "Success",
          description: "Event deleted successfully!",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openEventDialog = (event = null) => {
    setEditingEvent(event)
    setIsEventDialogOpen(true)
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
        <Button onClick={fetchEvents} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-600">Manage Events</h1>
        <Button onClick={() => openEventDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
            initialData={editingEvent}
            projects={projects}
            onCancel={() => {
              setIsEventDialogOpen(false)
              setEditingEvent(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={() => openEventDialog(event)}
              onDelete={handleDeleteEvent}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ManageEventsPage

