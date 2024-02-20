import { verifyJWT } from "./utils";

interface OrderTokenType {
  orderId: string;
  type: "soft" | "hard";
  productId: string;
}

const verifyOrderToken = (token: string) => {
  return verifyJWT(token) as OrderTokenType | null;
};

export { verifyOrderToken };
