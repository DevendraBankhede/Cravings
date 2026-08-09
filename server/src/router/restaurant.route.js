import express from "express";
import multer from "multer";
import {
  //RestaurantUpdateProfile,
  RestaurantGetData,
  RestaurantUpdateInfo,
  OpenRestaurant,
  RestaurantUpdateLegalInfo,
  RestaurantAddMenuItem,
  RestaurantMenuItems,
  RestaurantUpdateMenuItem,
  RestaurantUpdateMenuItemStatus,
  RestaurantToggleMenuItemControl,
  RestaurantDeleteMenuItem,
  RestaurantUpdateAddress,
  RestaurantUpdateBankingDocuments,
  RestaurantUpdateSocialMediaLinks,
  RestaurantUpdateCoverPhoto,
  RestaurantUpdateRestaurantImages,
} from "../controller/restaurant.controller.js";
import { RestaurantAuthProtect } from "../middleware/auth.middleware.js";

const upload = multer();
const router = express.Router();

// router.post(
//   "/update-profile",
//   RestaurantAuthProtect,
//   upload.single("coverImage"),
//   upload.array("restaurantImage", 10),
//   RestaurantUpdateProfile,
// );

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

router.get("/menu-items", RestaurantAuthProtect, RestaurantMenuItems);

router.post(
  "/add-menu-item",
  RestaurantAuthProtect,
  upload.single("itemImage"),
  RestaurantAddMenuItem,
);

router.put(
  "/menu-item/:itemId",
  RestaurantAuthProtect,
  upload.single("itemImage"),
  RestaurantUpdateMenuItem,
);

router.patch(
  "/menu-item/:itemId/status",
  RestaurantAuthProtect,
  RestaurantUpdateMenuItemStatus,
);

router.patch(
  "/menu-item/:itemId/control",
  RestaurantAuthProtect,
  RestaurantToggleMenuItemControl,
);

router.delete(
  "/menu-item/:itemId",
  RestaurantAuthProtect,
  RestaurantDeleteMenuItem,
);

// Core Details Routes

router.put(
  "/update-address",
  RestaurantAuthProtect,
  RestaurantUpdateAddress,
);

router.put(
  "/update-banking-documents",
  RestaurantAuthProtect,
  RestaurantUpdateBankingDocuments,
);

router.put(
  "/update-social-media-links",
  RestaurantAuthProtect,
  RestaurantUpdateSocialMediaLinks,
);

router.put(
  "/update-cover-photo",
  RestaurantAuthProtect,
  upload.single("coverImage"),
  RestaurantUpdateCoverPhoto,
);

router.put(
  "/update-restaurant-images",
  RestaurantAuthProtect,
  upload.array("restaurantImages", 8),
  RestaurantUpdateRestaurantImages,
);

export default router;