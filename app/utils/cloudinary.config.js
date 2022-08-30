import { v2 } from "cloudinary";
import { env } from "./env";

const cloudinary = v2;
cloudinary.config({
    cloud_name: env.cloudinary.cloud_name,
    api_key: env.cloudinary.api_key,
    api_secret: env.cloudinary.api_secret,
    secure: true,
});

export default cloudinary;
