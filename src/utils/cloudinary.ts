import cloudinary, { UploadApiResponse } from "cloudinary";

export const cloudinaryConfig = (): void => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = (url: string): Promise<UploadApiResponse> => {
  try {
    return cloudinary.v2.uploader.upload(url, {
      folder: "EasyHomeworks",
    });
  } catch (e) {
    return e.message;
  }
};
