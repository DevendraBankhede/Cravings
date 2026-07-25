import express from "express";
import multer from "multer";
import {
  RestaurantUpdateProfile,
  RestaurantGetData,
  RestaurantUpdateInfo,
  OpenRestaurant,
  RestaurantUpdateLegalInfo,
  RestaurantAddMenuItem,
} from "../controller/restaurant.controller.js";
import { RestaurantAuthProtect } from "../middleware/auth.middleware.js";

const upload = multer();
const router = express.Router();

router.post(
  "/update-profile",
  RestaurantAuthProtect,
  upload.single("coverImage"),
  upload.array("restaurantImage", 10),
  RestaurantUpdateProfile,
);

router.get("/get-resturant-data", RestaurantAuthProtect, RestaurantGetData);

router.put(
  "/update-restaurant-info",
  RestaurantAuthProtect,
  RestaurantUpdateInfo,
);

router.patch(
  "/change-open-status/:openStatus",
  RestaurantAuthProtect,
  OpenRestaurant,
);

router.put(
  "/update-legal-info",
  RestaurantAuthProtect,
  RestaurantUpdateLegalInfo,
); 

//Menu Routes

router.post(
  "/add-menu-item",
  RestaurantAuthProtect,
  upload.single("itemImage"),
  RestaurantAddMenuItem,
);

export default router;