try {
  const mongoose = require("mongoose");
  const app = require("./app");

  require("dotenv").config();

  mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("lisining on port no 4000");
    });
  });
} catch (err) {
  console.log(err);
}
// use 'express' from express;

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: "dhff64ify",
//     api_key: "587561999118966",
//     api_secret: "<your_api_secret>", // Click 'View Credentials' below to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();

//path for "/home"
