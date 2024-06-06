const download = require("image-downloader");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");
const { publicPath } = require("../info");
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
      dest: publicPath + "/" + path,
    });

    const uploadResult = await cloudinary.uploader
      .upload(publicPath + "/" + path, {
        public_id: `plac ${Date.now()}`,
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(uploadResult);

    if (uploadResult) {
      fs.unlink(`${publicPath + "/" + path}`, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          throw new CustomError("Unable to remove file", 300);
        }
      });
    }

    res.status(200).json({ hello: "nigga", url: uploadResult.url });
  } catch (err) {
    console.log(err);
    //console.log(req);
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
    //console.log(req);
    console.log(err);
    next(err);
  }
};

module.exports = { uploadByLink, uploadFromDevice };
