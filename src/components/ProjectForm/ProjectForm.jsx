"use client"

import { useForm, Controller } from "react-hook-form"
import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { Card, CardContent } from "../ui/card"
import { X, Upload } from "lucide-react"

export const ProjectForm = ({ onSubmit, initialData, onCancel = null }) => {
  const [previewImage, setPreviewImage] = useState(initialData?.coverImage || null)
  const fileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setPreviewImage(URL.createObjectURL(file))
        setValue("coverImage", file)
      }
    },
    [setValue],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  const removeImage = () => {
    setPreviewImage(null)
    setValue("coverImage", null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const submitHandler = (data) => {
    const formData = new FormData()
    for (const key in data) {
      if (key === "coverImage" && data[key]) {
        formData.append(key, data[key])
      } else {
        formData.append(key, data[key])
      }
    }
    onSubmit(formData)
    if (!initialData) {
      reset()
      setPreviewImage(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  defaultValue={initialData?.title}
                  placeholder="Enter project title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Input
                  id="subheading"
                  {...register("subheading")}
                  defaultValue={initialData?.subheading}
                  placeholder="Enter subheading"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                {...register("motivation", { required: "Motivation is required" })}
                placeholder="Describe the project motivation"
                defaultValue={initialData?.motivation}
                className="min-h-[100px]"
              />
              {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Controller
                  name="season"
                  control={control}
                  defaultValue={initialData?.season || ""}
                  rules={{ required: "Season is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="autumn">Autumn</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                        <SelectItem value="eid-ul-fitr">Eid Ul Fitr</SelectItem>
                        <SelectItem value="eid-ul-adha">Eid Ul adha</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.season && <p className="text-red-500 text-sm">{errors.season.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Goal Amount</Label>
                <Input
                  id="goal"
                  {...register("goal", {
                    required: "Goal amount is required",
                    pattern: { value: /^\d+$/, message: "Please enter a valid number" },
                  })}
                  placeholder="Enter goal amount"
                  type="number"
                  defaultValue={initialData?.goal}
                />
                {errors.goal && <p className="text-red-500 text-sm">{errors.goal.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
                }`}
                onClick={handleUploadClick}
              >
                <input
                  {...getInputProps()}
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file))
                      setValue("coverImage", file)
                    }
                  }}
                />
                {previewImage ? (
                  <div className="relative">
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Cover preview"
                      width={300}
                      height={200}
                      objectFit="cover"
                      className="mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage()
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">Drag & drop an image here, or click to select one</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

