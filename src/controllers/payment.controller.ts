import { Request, Response, NextFunction } from "express";
import { createOrder } from "../utils/razorpay.utils";
import { getAmount, getFileId } from "../utils/modules.utils";
import { addPermission } from "../utils/drive.utils";
import { generateHMAC } from "../utils/utils";
import { addModulePurchase } from "../utils/modulePurchase.utils";

const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, type }: { productId: string; type: "soft" | "hard" } =
      req.body;
    const { softCopyPrice, hardCopyPrice } = await getAmount(productId);
    if (softCopyPrice && hardCopyPrice) {
      const { id, amount, currency } = await createOrder(
        (type === "soft" ? softCopyPrice : hardCopyPrice) * 100,
      );
      const digest = generateHMAC(id);
      res.json({
        order_id: id,
        digest,
        amount,
        currency,
        key: process.env.RAZOR_ID,
        name: "Notes-Era",
        description: `Order of ${productId} ${type}Copy.`,
      });
    } else {
      res.json({
        isErr: true,
        message: "Internal error occured while creating order.",
        status: "error",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isErr: true,
      message: "Internal error occured while creating order.",
      status: "error",
    });
    next(err);
  }
};

const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      address,
      contactNumber,
      productId,
      email,
      digest,
      orderId,
      paymentId,
      signature,
      purchaseType,
    } = req.body;
    const orderDigest = generateHMAC(orderId);
    if (digest === orderDigest) {
      const orderSignature = generateHMAC(
        orderId + "|" + paymentId,
        process.env.RAZOR_SECRET,
      );
      if (signature === orderSignature) {
        if (purchaseType === "soft") {
          const fileId = await getFileId(productId);
          if (fileId) {
            await addPermission(email, fileId);
            await addModulePurchase({
              name,
              address,
              contactNumber,
              productId,
              email,
              orderId,
              paymentId,
              signature,
              purchaseType,
            });
            return res.json({ isErr: false, status: "success" });
          }
        } else if (purchaseType === "hard") {
          console.log(`${name} bought ${productId} hard copy.`);
          await addModulePurchase({
            name,
            address,
            contactNumber,
            productId,
            email,
            orderId,
            paymentId,
            signature,
            purchaseType,
          });
          return res.json({ isErr: false, status: "success" });
        }
      }
    }
    res.status(500).json({
      isErr: true,
      status: "error",
      message: "Order datails are not correct.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isErr: true,
      message: "Internal error occured while verifying order.",
      status: "error",
    });
    next(err);
  }
};

export { createNewOrder, verifyPayment };
