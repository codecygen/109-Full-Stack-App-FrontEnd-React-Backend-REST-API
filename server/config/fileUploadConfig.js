const path = require("path");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype;

  const fileExtension = path.extname(file.originalname).split(".").pop();

  // "jpg", "jpeg", "png", "gif"
  if (
    fileType === "image/jpg" ||
    fileType === "image/jpeg" ||
    fileType === "image/png" ||
    fileType === "image/gif"
  ) {
    cb(null, true);
  } else {
    req.notAllowedExtension = fileExtension;
    return cb(null, false, req.notAllowedExtension);
  }
};

const fileUploadConfig = multer({
  storage: fileStorage,
  // 2MB
  limits: { fileSize: 2000000 },
  fileFilter,
});

module.exports = fileUploadConfig;