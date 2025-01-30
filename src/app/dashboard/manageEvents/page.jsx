"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventForm = ({
  onSubmit,
  initialData = null,
  projects,
  onCancel = null,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const submitHandler = (data) => {
    onSubmit(data);
    if (!initialData) reset(); // Only reset if it's a new event form
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input
        {...register("title", { required: "Title is required" })}
        placeholder="Event Title"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <Controller
        name="projectId"
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
      {errors.projectId && (
        <p className="text-red-500 text-sm">{errors.projectId.message}</p>
      )}

      <Textarea
        {...register("description", { required: "Description is required" })}
        placeholder="Event Description"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <Controller
        name="eventDate"
        control={control}
        rules={{ required: "Event date is required" }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                // disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.eventDate && (
        <p className="text-red-500 text-sm">{errors.eventDate.message}</p>
      )}

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
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}

      <Input
        {...register("totalFundRaised", {
          required: "Total fund raised is required",
          pattern: { value: /^\d+$/, message: "Please enter a valid number" },
        })}
        placeholder="Total Fund Raised"
        type="number"
      />
      {errors.totalFundRaised && (
        <p className="text-red-500 text-sm">{errors.totalFundRaised.message}</p>
      )}

      <Input
        {...register("totalDistribution", {
          required: "Total distribution is required",
          pattern: { value: /^\d+$/, message: "Please enter a valid number" },
        })}
        placeholder="Total Distribution"
        type="number"
      />
      {errors.totalDistribution && (
        <p className="text-red-500 text-sm">
          {errors.totalDistribution.message}
        </p>
      )}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? "Update Event" : "Add Event"}
        </Button>
      </div>
    </form>
  );
};

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
                event.status === "upcoming"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {event.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
          <p className="text-sm font-semibold mb-1">
            Project: {event?.project || "Unknown"}
          </p>
          <p className="text-sm mb-1">
            Date: {format(new Date(event.eventDate), "PPP")}
          </p>
          <p className="text-sm mb-1">Funds Raised: ${event.totalFundRaised}</p>
          <p className="text-sm">Distribution: ${event.totalDistribution}</p>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(event)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(event._id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    fetchProjects();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/manageEvents");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      toast({
        title: "Error",
        description:
          "Failed to load projects. Some event information may be incomplete.",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch("/api/manageEvents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("Failed to add event");
      const res = await response.json();
      if (res.acknowledged) {
        fetchEvents();
        toast({
          title: "Success",
          description: "Event added successfully!",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      const response = await fetch(`/api/manageEvents/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("Failed to update event");
      const res = await response.json();
      if (res.modifiedCount > 0) {
        fetchEvents();
        toast({
          title: "Success",
          description: "Event updated successfully!",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/manageEvents/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      const res = await response.json();
      if (res.deletedCount > 0) {
        fetchEvents();
        toast({
          title: "Success",
          description: "Event deleted successfully!",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
        <Button onClick={fetchEvents} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-600">Manage Events</h1>
        <Dialog
          open={isAddEventDialogOpen}
          onOpenChange={setIsAddEventDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm
              onSubmit={handleAddEvent}
              projects={projects}
              onCancel={() => setIsAddEventDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {editingEvent && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
          </CardHeader>
          <CardContent>
            <EventForm
              onSubmit={handleUpdateEvent}
              initialData={editingEvent}
              projects={projects}
              onCancel={() => setEditingEvent(null)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={setEditingEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageEventsPage;
