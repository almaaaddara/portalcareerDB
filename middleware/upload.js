const multer = require("multer");
const ApiError = require("../utils/apiError");

const storage = multer.memoryStorage();
const allowedImageMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
const allowedPdfMimeType = ["application/pdf"];

const imageFilter = (req, file, cb) => {
  const isAllowedMimeType = allowedImageMimeTypes.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  return cb(new ApiError("Ekstensi gambar tidak valid", 400));
};

const pdfFilter = (req, file, cb) => {
  const isAllowedMimeType = allowedPdfMimeType.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  return cb(new ApiError("Ekstensi PDF tidak valid", 400));
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "imageFile") {
      imageFilter(req, file, cb);
    } else if (file.fieldname === "pdfFile") {
      pdfFilter(req, file, cb);
    } else {
      cb(new ApiError("Field tidak valid", 400));
    }
  },
}).fields([
  { name: "imageFile", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
]);

module.exports = upload;