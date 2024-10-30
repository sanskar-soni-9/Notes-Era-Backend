import { Router } from "express";
import {
  createNewOrder,
  handleWebhook,
} from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", createNewOrder);
router.post("/webhook", handleWebhook);

export default router;
