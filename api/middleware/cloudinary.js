const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDIARY_CLOUD_NAME,
  api_key: process.env.CLOUDIARY_API_KEY,
  api_secret: process.env.CLOUDIARY_API_SECRETE, // Click 'View Credentials' below to copy your API secret
});

module.exports = cloudinary;
