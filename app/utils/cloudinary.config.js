const { v2 } = require("cloudinary");
const { env } = require("./env");

const cloudinary = v2;
cloudinary.config({
    cloud_name: env.cloudinary.cloud_name,
    api_key: env.cloudinary.api_key,
    api_secret: env.cloudinary.api_secret,
    secure: true,
});

module.exports = cloudinary;
