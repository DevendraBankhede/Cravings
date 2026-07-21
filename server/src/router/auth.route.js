import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
  SendOtp,
  VerifyOtp,
  ResetPassword,
} from "../controller/auth.controller.js";
import { OTPAuthProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);

router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);

export default router;