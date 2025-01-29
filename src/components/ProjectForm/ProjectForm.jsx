'use client';

import { useForm } from "react-hook-form";
import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ProjectForm = ({ onSubmit, initialData, onCancel = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  const submitHandler = (data) => {
    onSubmit(data)
    if (!initialData) reset() // Only reset if it's a new project form
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input {...register("title", { required: "Title is required" })} defaultValue={initialData?.title} placeholder="Project Title" />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <Textarea
        {...register("description", { required: "Description is required" })}
        placeholder="Project Description"
        defaultValue={initialData?.description}
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <Input
        {...register("goal", {
          required: "Goal amount is required",
          pattern: { value: /^\d+$/, message: "Please enter a valid number" },
        })}
        placeholder="Goal Amount"
        type="number"
        defaultValue={initialData?.goal}
      />
      {errors.goal && <p className="text-red-500 text-sm">{errors.goal.message}</p>}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialData ? "Update Project" : "Add Project"}</Button>
      </div>
    </form>
  )
}