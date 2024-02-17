import mongoose, { Document, Model, Schema } from "mongoose";

type PremiumsDocument = Document & {
  year: number;
  programme: string;
  branch: string;
  subject: string;
  isPaid: boolean;
  fileId: string;
  fileName: string;
  link: string;
  image: string;
};

const PremiumsSchema = new Schema(
  {
    year: {
      type: Schema.Types.Number,
      required: true,
    },
    programme: {
      type: Schema.Types.String,
      required: true,
    },
    branch: {
      type: Schema.Types.String,
      required: true,
    },
    subject: {
      type: Schema.Types.String,
      required: true,
    },
    isPaid: {
      type: Schema.Types.Boolean,
      required: true,
    },
    fileId: {
      type: Schema.Types.String,
      required: true,
    },
    fileName: {
      type: Schema.Types.String,
      required: true,
    },
    link: {
      type: Schema.Types.String,
    },
    image: {
      type: Schema.Types.String,
    },
  },
  {
    collection: "premiums",
  },
);

const Premiums: Model<PremiumsDocument> = mongoose.model<PremiumsDocument>(
  "Premiums",
  PremiumsSchema,
);

export default Premiums;
export { PremiumsDocument };
