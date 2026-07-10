import express from "express";
import multer from "multer";
import {
  EditUserProfile,
  UpdateUserPassword,
} from "../controller/common.controller.js";
import { AuthProtect } from "../middleware/auth.middleware.js";

const Upload = multer();
const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  Upload.single("displayPic"),
  EditUserProfile,
);

router.patch("/change-password", AuthProtect, UpdateUserPassword);

export default router;