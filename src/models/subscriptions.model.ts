import mongoose, { Document, Model, Schema } from "mongoose";

type SubscriptionDocument = Document & {
  email: string;
};

type SubscriptionInput = {
  email: SubscriptionDocument["email"];
};

const SubscriptionSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "subscription",
  },
);

const Subscription: Model<SubscriptionDocument> =
  mongoose.model<SubscriptionDocument>("Subscription", SubscriptionSchema);

export default Subscription;
export { SubscriptionDocument, SubscriptionInput };
