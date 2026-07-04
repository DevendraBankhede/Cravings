import express from "express";
import { EditUserProfile } from "../controller/user.controller.js";
import { AuthProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/edit-profile", AuthProtect, EditUserProfile);

export default router;