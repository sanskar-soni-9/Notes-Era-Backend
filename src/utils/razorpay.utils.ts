import { getRazorPay } from "../config/razorpay.config";

const razorpay = getRazorPay();

const createOrder = async (price: number) => {
  if (razorpay) {
    const { id, amount, currency } = await razorpay.orders.create({
      amount: price,
      currency: "INR",
    });
    return { id, amount, currency };
  } else {
    throw new Error("RazorPay not found.");
  }
};

export { createOrder };
