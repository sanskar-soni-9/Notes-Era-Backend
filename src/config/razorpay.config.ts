import dotenv from "dotenv";
dotenv.config();
import { Razorpay } from "razorpay-typescript";

export const getRazorPay = () => {
  try {
    const razorPay = new Razorpay({
      authKey: {
        key_id: process.env.RAZOR_ID!,
        key_secret: process.env.RAZOR_SECRET!,
      },
    });
    return razorPay;
  } catch (err) {
    console.error(`Error while getting RazorPay: ${err}`);
  }
};
