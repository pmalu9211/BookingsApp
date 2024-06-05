const download = require("image-downloader");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");
require("dotenv").config();

const uploadByLink = async (req, res, next) => {
  try {
    const { photoLink } = req.body;
    if (photoLink) {
      sendtest = photoLink;
    }
    const path = Date.now() + ".jpg";
    await download.image({
      url: photoLink,
      dest: __dirname + "/public" + "/" + path,
    });

    const uploadResult = await cloudinary.uploader
      .upload(__dirname + "/public" + "/" + path, {
        public_id: "place",
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(200).json({ hello: "nigga", url: uploadResult.url });
  } catch (err) {
    console.log(err);
    console.log(req);
    console.log(err);
    next(err);
  }
};

const uploadFromDevice = async (req, res, next) => {
  try {
    console.log(req.files);
    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      const { url } = await cloudinary.uploader.upload(req.files[i].path);
      // Remove the file
      fs.unlink(`${req.files[i].path}`, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          throw new CustomError("Unable to remove file", 300);
        }
      });
      urls = [...urls, url];
    }
    console.log(urls);
    res.status(200).json(urls);
  } catch (err) {
    console.log(req);
    console.log(err);
    next(err);
  }
};

module.exports = { uploadByLink, uploadFromDevice };