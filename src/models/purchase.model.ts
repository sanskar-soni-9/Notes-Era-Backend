import mongoose, { Document, Model, Schema } from "mongoose";

type PurchaseDocument = Document & {
  email: string;
  files: string[];
};

type PurchaseInput = {
  email: PurchaseDocument["email"];
  files: PurchaseDocument["files"];
};

const purchaseSchema = new Schema(
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
  purchaseSchema,
);

export { Purchase, PurchaseInput, PurchaseDocument };
