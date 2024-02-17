import mongoose, { Document, Model, Schema } from "mongoose";

type PurchaseDocument = Document & {
  email: string;
  files: string[];
};

type PurchaseInput = {
  email: PurchaseDocument["email"];
  files: PurchaseDocument["files"];
};

const PurchaseSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    files: {
      type: Schema.Types.Array,
      required: true,
    },
  },
  {
    collection: "purchase",
  },
);

const Purchase: Model<PurchaseDocument> = mongoose.model<PurchaseDocument>(
  "Purchase",
  PurchaseSchema,
);

export default Purchase;
export { PurchaseInput, PurchaseDocument };
