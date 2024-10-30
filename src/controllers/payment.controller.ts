import { Request, Response, NextFunction } from "express";
import { createOrder } from "../utils/payment.utils";
import { getAmount, getFileId } from "../services/modules.service";
import { addPermission } from "../utils/drive.utils";
import { generateJWT } from "../utils/utils";
import { addModulePurchase } from "../services/modulePurchase.service";
import { Cashfree } from "../configs/payment.config";

type CreateNewOrderBody = {
  productId: string;
  type: "soft" | "hard";
  name: string;
  address: string;
  number: number;
  email: string;
};
const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      productId,
      type,
      name,
      address,
      number,
      email,
    }: CreateNewOrderBody = req.body;
    const { softCopyPrice, hardCopyPrice } = await getAmount(productId);
    if (softCopyPrice && hardCopyPrice) {
      const paymentId = await createOrder(
        type,
        productId,
        type === "soft" ? softCopyPrice : hardCopyPrice,
        name,
        email,
        number,
        address,
      );
      const token = generateJWT({ orderId: paymentId, type, productId });
      res.json({
        paymentId,
        token,
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

const handleWebhook = async (req: Request, res: Response) => {
  try {
    Cashfree.PGVerifyWebhookSignature(
      String(req.headers["x-webhook-signature"]),
      req.rawBody,
      String(req.headers["x-webhook-timestamp"]),
    );
    const { body } = req;
    if (body.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const { customer_name, customer_id, customer_email, customer_phone } =
        body.data.customer_details;
      const orderId = body.data.order.order_id;
      const { product_id, type, customer_address } = body.data.order.order_tags;
      const paymentId = body.data.payment.cf_payment_id;

      if (type === "soft") {
        const fileId = await getFileId(product_id);
        if (fileId) {
          await addPermission(customer_email, fileId);
        }
      }
      await addModulePurchase({
        name: customer_name,
        address: customer_address,
        contactNumber: customer_phone,
        productId: product_id,
        email: customer_email,
        orderId,
        paymentId,
        signature: customer_id,
        purchaseType: type,
      });
    }
    res.json(null);
  } catch (err) {
    console.log("PAYMENT VERIFICATION ERROR:", err);
    res.json("troll");
  }
};

export { createNewOrder, handleWebhook };
