import { Request, Response, NextFunction } from "express";
import { createOrder } from "../utils/razorpay.utils";
import { getAmount, getFileId } from "../services/modules.service";
import { addPermission } from "../utils/drive.utils";
import { generateHMAC, generateJWT } from "../utils/utils";
import { addModulePurchase } from "../services/modulePurchase.service";
import { verifyOrderToken } from "../utils/payment.utils";

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
      const token = generateJWT({ orderId: id, type, productId });
      res.json({
        order_id: id,
        token,
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
      email,
      token,
      orderId,
      paymentId,
      signature,
    } = req.body;
    const decodedToken = verifyOrderToken(token);
    const orderSignature = generateHMAC(
      orderId + "|" + paymentId,
      process.env.RAZOR_SECRET,
    );
    if (
      decodedToken &&
      decodedToken.orderId === orderId &&
      signature === orderSignature
    ) {
      if (decodedToken.type === "soft") {
        const fileId = await getFileId(decodedToken.productId);
        if (fileId) {
          await addPermission(email, fileId);
          await addModulePurchase({
            name,
            address,
            contactNumber,
            productId: decodedToken.productId,
            email,
            orderId,
            paymentId,
            signature,
            purchaseType: decodedToken.type,
          });
          return res.json({ isErr: false, status: "success" });
        }
      } else {
        console.log(`${name} bought ${decodedToken.productId} hard copy.`);
        await addModulePurchase({
          name,
          address,
          contactNumber,
          productId: decodedToken.productId,
          email,
          orderId,
          paymentId,
          signature,
          purchaseType: decodedToken.type,
        });
        return res.json({ isErr: false, status: "success" });
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
