import express from "express";

import path from "path";

//  A middleware for handling multipart/form-data, which is primarily used for uploading files.
import multer from "multer";

const router = express.Router();

// Defining storage and filename settings for Multer to save uploaded files.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});
// console.log(cb);

// console.log(storage);

const fileFilter = (req, file, cb) => {
  // Regular expression to match file extensions (e.g., jpeg, jpg, png, webp).
  const filetypes = /jpe?g|png|webp/;

  // Regular expression to match file mimetypes (e.g., image/jpeg, image/png, image/webp).
  const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

  const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

// Initializing Multer middleware with the configured storage and file filter functions
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// route for handling POST requests to upload a single image
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        Image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
