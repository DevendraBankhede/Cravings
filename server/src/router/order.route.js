import express from "express";
import { AuthProtect } from "../middleware/auth.middleware.js";
import { CreateOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/create", AuthProtect, CreateOrder);

export default router;