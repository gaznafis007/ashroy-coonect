export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("image", file)
  
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error("Image upload failed")
      }
  
      const data = await response.json()
      return data.data.url // Returns the ImageBB URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error
    }
  }
  export const uploadImages = async (files) => {
    const uploadedImageUrls = []
  
    for (const file of files) {
      const formData = new FormData()
      formData.append("image", file)
  
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
          method: "POST",
          body: formData,
        })
  
        if (!response.ok) {
          throw new Error("Image upload failed")
        }
  
        const data = await response.json()
        uploadedImageUrls.push(data.data.url) // Save each uploaded image URL
      } catch (error) {
        console.error("Error uploading image:", error)
        throw error
      }
    }
  
    return uploadedImageUrls // Return an array of URLs
  }
    