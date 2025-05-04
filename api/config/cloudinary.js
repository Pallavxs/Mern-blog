import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINAY_APP_NAME,
  api_key: process.env.CLOUDINAY_API_KEY ,
  api_secret: process.env.CLOUDINAY_API_SECRET , 
});

export default cloudinary;