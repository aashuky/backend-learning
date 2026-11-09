
import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ============================================
// REGISTER USER
// POST /api/v1/users/register
// ============================================

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

// ============================================
// LOGIN USER
// POST /api/v1/users/login
// ============================================

router.route("/login").post(loginUser);

// ============================================
// LOGOUT USER
// POST /api/v1/users/logout
// ============================================

router.route("/logout").post(
  verifyJWT,
  logoutUser
);

// ============================================
// EXPORT ROUTER
// ============================================

export default router;
