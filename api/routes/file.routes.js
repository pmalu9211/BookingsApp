const { Router } = require("express");
const {
  uploadFromDevice,
  uploadByLink,
} = require("../controllers/file.controllers");
const upload = require("../middleware/multer");

fileRouter = Router();

fileRouter.route("/upload-by-link").post(uploadByLink);
fileRouter.route("/upload").post(upload.array("photo", 5), uploadFromDevice);

module.exports = fileRouter;
