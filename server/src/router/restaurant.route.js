import express from "express";
import multer from "multer";
import { restaurantUpdateProfile } from "../controllers/restaurant.controller.js";
import { RestaurantAuthProtect } from "../middleware/auth.middelware.js";

const upload = multer();
const router = express.Router();

router.post(
  "/update-profile",
  RestaurantAuthProtect,
  upload.single("coverImage"),
  upload.array("restaurantImage", 10),
  restaurantUpdateProfile,
);

export default router;