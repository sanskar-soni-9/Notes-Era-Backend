import {
  Cashfree,
  version as CashfreeVersion,
} from "../configs/payment.config";
import { CreateOrderRequest } from "cashfree-pg";

const createOrder = async (
  type: string,
  productId: string,
  price: number,
  name: string,
  email: string,
  number: number,
  address: string,
) => {
  const orderRequest: CreateOrderRequest = {
    order_amount: price,
    order_currency: "INR",
    customer_details: {
      customer_id: name.trim().split(" ")[0] + Date.now().toString(),
      customer_phone: String(number),
      customer_name: name,
      customer_email: email,
    },
    order_tags: {
      product_id: productId,
      type,
      customer_address: address,
    },
  };

  try {
    const { data } = await Cashfree.PGCreateOrder(
      CashfreeVersion,
      orderRequest,
    );
    return String(data.payment_session_id);
  } catch (err) {
    console.log(err);
    throw new Error("Error occured while creating cashfree order.");
  }
};

export { createOrder };
