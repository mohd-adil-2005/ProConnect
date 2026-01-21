import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";

console.log("bucket name is ", process.env.AWS_BUCKET_NAME);

const upload = multer({
  storage: multerS3({
    s3: s3, // v3 client
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/useradil/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
