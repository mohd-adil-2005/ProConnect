import  Router from "express";
const router=Router();
import {register,userProfileDownload,whataremyconnection,sendConnectionRequest, acceptconnectionrequest,getMyconnectionRequest} from "../Controllers/user.controller.js";
import {getUserProfile,login,upload_profilepictuer, updateuserprofile,getuserupdateprofile,getuserProfilebasedOnuserName,updateProfileData} from "../Controllers/user.controller.js";
import multer from "multer";
import path from "path";
import Profile from "../Models/profileModel.js";
import User from "../Models/userModel.js";


//multer profile picture here
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


router.route("/update_profile").post(upload.single("profile"),upload_profilepictuer);

router.route("/register").post(register);


router.route("/login").post(login);

router.route("/user_update").post(updateuserprofile);

router.route("/get_user_update_profile").get(getuserupdateprofile);

router.route("/user/get_allusers").get(getUserProfile);


router.route("/user/user_profile_download").get(userProfileDownload);
router.route("/update_Profile_Data").post(updateProfileData);


router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/get_connection_request").get( getMyconnectionRequest);
router.route("/user/user_connection_request").get(whataremyconnection);
router.route("/user/accept_connection_request").post(acceptconnectionrequest);
router.route("/user/get_user_profile_based_on_username").get(getuserProfilebasedOnuserName);


export default router;
