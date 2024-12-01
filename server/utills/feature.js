import { cloudinaryUploader } from '../config/CloudinaryConfig.js'
import { v2 as cloudinary } from 'cloudinary'

export const getOtherMember = (members = [], userId) => {
    return members?.find((member) => member._id.toString() !== userId.toString());
  }
  

export const deleteFileFromCloudinary = async (public_ids) => {
    try {
      const results = await Promise.all(
        public_ids.map((id) => cloudinary.uploader.destroy(id))
      );
    //   console.log('Bulk Deletion Results:', results);
    } catch (error) {
    //   console.error('Error during bulk deletion:', error.message);
    }
  };
  
