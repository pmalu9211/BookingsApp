const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    cb(null, "D:/Pratham/Coding/Web/Aribnb/api/public");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
