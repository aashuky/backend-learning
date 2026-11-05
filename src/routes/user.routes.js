
import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    updateAccountDetails,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register user
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

// Login
router.route("/login").post(loginUser);

// Protected routes
router.route("/logout").post(
    verifyJWT,
    logoutUser
);

router.route("/refresh-token").post(
    refreshAccessToken
);

router.route("/change-password").post(
    verifyJWT,
    changeCurrentPassword
);

router.route("/current-user").get(
    verifyJWT,
    getCurrentUser
);

router.route("/update-account").patch(
    verifyJWT,
    updateAccountDetails
);

// Avatar
router.route("/avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
);

// Cover image
router.route("/cover-image").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
);

// Channel profile
router.route("/c/:username").get(
    verifyJWT,
    getUserChannelProfile
);

// Watch history
router.route("/history").get(
    verifyJWT,
    getWatchHistory
);

export default router;
