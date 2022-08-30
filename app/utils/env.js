import dotenv from "dotenv";
dotenv.config();

import { getOsEnv } from "../lib";

export const env = {
    app: {
        port: getOsEnv("PORT") || 8080,
    },
    cloudinary: {
        cloud_name: getOsEnv("CLOUD_NAME"),
        api_key: getOsEnv("API_KEY"),
        api_secret: getOsEnv("API_SECRET"),
    },
};
