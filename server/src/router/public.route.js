import express from "express";
import { ContactUsForm } from "../controller/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);


export default router;