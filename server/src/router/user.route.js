import express from "express";
import multer from "multer";
import { EditUserProfile } from "../controller/user.controller.js";
import { AuthProtect } from "../middleware/auth.middleware.js";

const Upload = multer();
const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  Upload.single("displayPic"),
  EditUserProfile,
);

export default router;