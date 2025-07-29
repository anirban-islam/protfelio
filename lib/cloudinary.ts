import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "anirban-portfolio/images",
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result!.secure_url)
          }
        },
      )
      .end(bytes)
  })
}

export const uploadFile = async (file: File, folder = "documents"): Promise<any> => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: `anirban-portfolio/${folder}`,
          format: file.type === "application/pdf" ? "pdf" : undefined,
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        },
      )
      .end(bytes)
  })
}

export const deleteFile = async (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export default cloudinary
