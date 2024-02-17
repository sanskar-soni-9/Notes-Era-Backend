import mongoose, { Model, Document, Schema } from "mongoose";

type FilteredModulesType = {
  repoId: string;
  slug: string;
  name: string;
  thumbnailSrc: string;
  about?: string;
  rating: number;
  totalRatings: number;
  previews: { previewSrc: string }[];
  softCopyPrice?: number;
  hardCopyPrice?: number;
  description?: string;
  topics?: { title: string; description: string }[];
};

type ModulesType = FilteredModulesType & { fileId: string };

type ModulesDocument = Document & ModulesType;

const PreviewsSchema = new Schema({
  previewSrc: { type: Schema.Types.String, required: true },
});

const TopicsSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
});

const ModuleSchema = new Schema({
  repoId: { type: Schema.Types.String, required: true },
  fileId: { type: Schema.Types.String, required: true },
  slug: { type: Schema.Types.String, required: true, unique: true },
  name: { type: Schema.Types.String, required: true },
  thumbnailSrc: { type: Schema.Types.String, required: true },
  about: { type: Schema.Types.String, required: false },
  rating: { type: Schema.Types.Number, required: true },
  totalRatings: { type: Schema.Types.Number, required: true },
  previews: { type: [PreviewsSchema], required: true },
  softCopyPrice: { type: Schema.Types.Number, required: false },
  hardCopyPrice: { type: Schema.Types.Number, required: false },
  description: { type: Schema.Types.String, required: false },
  topics: { type: [TopicsSchema], required: false },
});

const Modules: Model<ModulesDocument> = mongoose.model<ModulesDocument>(
  "modules",
  ModuleSchema,
);

export default Modules;
export { ModulesDocument, ModulesType, FilteredModulesType };
