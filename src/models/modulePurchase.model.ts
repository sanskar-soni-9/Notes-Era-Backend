import mongoose, { Model, Document, Schema } from "mongoose";

type ModulePurchaseType = {
  name: string;
  address?: string;
  contactNumber: number;
  productId: string;
  email: string;
  orderId: string;
  paymentId: string;
  signature: string;
  purchaseType: string;
};

type ModulePurchaseDocument = Document & ModulePurchaseType;

type ModulePurchaseInput = {
  name: ModulePurchaseDocument["name"];
  address?: ModulePurchaseDocument["address"];
  contactNumber: ModulePurchaseDocument["contactNumber"];
  productId: ModulePurchaseDocument["productId"];
  email: ModulePurchaseDocument["email"];
  orderId: ModulePurchaseDocument["orderId"];
  paymentId: ModulePurchaseDocument["paymentId"];
  signature: ModulePurchaseDocument["signature"];
  purchaseType: ModulePurchaseDocument["purchaseType"];
};

const ModulePurchaseSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  address: { type: Schema.Types.String, required: false },
  contactNumber: { type: Schema.Types.Number, required: true },
  productId: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  orderId: { type: Schema.Types.String, required: true },
  paymentId: { type: Schema.Types.String, required: true },
  signature: { type: Schema.Types.String, required: true },
  purchaseType: { type: Schema.Types.String, required: true },
});

const ModulePurchase: Model<ModulePurchaseDocument> =
  mongoose.model<ModulePurchaseDocument>(
    "modulesPurchase",
    ModulePurchaseSchema,
  );

export default ModulePurchase;
export { ModulePurchaseInput, ModulePurchaseType, ModulePurchaseDocument };
