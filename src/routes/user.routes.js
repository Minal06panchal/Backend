import express from 'express';
import multer from "multer";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage to get file buffer
const upload = multer({ storage });
import { verifyJWT } from "../middlewares/auth.middleware.js";


router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router;
