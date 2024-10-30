import dotenv from "dotenv";
dotenv.config();
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.PAYMENT_ID;
Cashfree.XClientSecret = process.env.PAYMENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

const version = "2023-08-01";

export { Cashfree, version };
