import premiumRouter from "./premium.router";
import subscriptionRouter from "./subscription.router";
import modulesRouter from "./modules.rotuer";
import paymentRouter from "./payment.router";
import { Router } from "express";

const router = Router();

router.use("/api/premium", premiumRouter);
router.use("/api/subscribe", subscriptionRouter);
router.use("/api/modules", modulesRouter);
router.use("/api/payment", paymentRouter);

export default router;
