import  Router from "express";
import { commentPost,get_comment_bypost, createPost, destroyCommnet, destroyPost, getAllPost, incrementLikes } from "../Controllers/postcontroller.js";
const router=Router();
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
 filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // keep file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
})

const upload = multer({ storage })   






router.route("/post").
post(upload.single('media'),createPost);

router.route("/posts").get(getAllPost);

//destroy post 
router.route("/destroy_post").delete(destroyPost);

router.route("/comment_post").post(commentPost);
router.route("/get_comments").get(get_comment_bypost);
router.route("/destroy_comment").post(destroyCommnet);
router.route("/increment_likes").post(incrementLikes);





export default router;
