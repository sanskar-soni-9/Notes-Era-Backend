import { Router } from "express";
import { handleSubscription } from "../controllers/subscription.controller.js";

const router = Router();

router.post("/", handleSubscription);

export default router;
