import { cloudinaryUploader } from '../config/CloudinaryConfig.js'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from "uuid"

export const getOtherMember = (members = [], userId) => {
  return members?.find((member) => member._id.toString() !== userId.toString())
}

const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString('base64')}`



 export const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: 'auto',
          publicId: uuid(),
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
    })
  })

  try {
    const results = await Promise.all(uploadPromises)

    const formattedResults = results.map((result) => ({
      publicId: result.public_id,
      url: result.secure_url,
    }))
    return formattedResults
  } catch (err) {
    throw new Error('Error uploading files to cloudinary', err)
  }
}

export const deleteFileFromCloudinary = async (public_ids) => {
  try {
    const results = await Promise.all(
      public_ids.map((id) => cloudinary.uploader.destroy(id))
    )
    //   console.log('Bulk Deletion Results:', results);
  } catch (error) {
    //   console.error('Error during bulk deletion:', error.message);
  }
}
