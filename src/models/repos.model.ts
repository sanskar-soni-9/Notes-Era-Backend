import mongoose, { Document, Model, Schema } from "mongoose";

type ReposType = {
  repoId: string;
  name: string;
  about?: string;
};

type ReposDocument = Document & ReposType;

const ReposSchema = new Schema(
  {
    repoId: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    about: {
      type: Schema.Types.String,
      required: false,
    },
  },
  { collection: "repos" },
);

const Repos: Model<ReposDocument> = mongoose.model<ReposDocument>(
  "Repos",
  ReposSchema,
);

export default Repos;
export { ReposDocument, ReposType };
