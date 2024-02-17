import { Router } from "express";
import {
  createNewOrder,
  verifyPayment,
} from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", createNewOrder);
router.post("/verify", verifyPayment);

export default router;
