import { v2 as cloudinary } from "cloudinary";

// Configuration - Make sure your `.env` has these variables set properly
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image buffer to Cloudinary using upload_stream
const uploadOnCloudinary = async (fileBuffer) => {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};

export { uploadOnCloudinary };
