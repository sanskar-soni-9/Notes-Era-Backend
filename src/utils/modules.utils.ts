import Modules, {
  ModulesDocument,
  FilteredModulesType,
} from "../models/modules.model";

const filterModule = (module: ModulesDocument): FilteredModulesType => ({
  repoId: module.repoId,
  slug: module.slug,
  name: module.name,
  thumbnailSrc: module.thumbnailSrc,
  about: module.about,
  rating: module.rating,
  totalRatings: module.totalRatings,
  previews: module.previews,
  softCopyPrice: module.softCopyPrice,
  hardCopyPrice: module.hardCopyPrice,
  description: module.description,
  topics: module.topics,
});

const getModules = async (): Promise<FilteredModulesType[]> => {
  const modules = await Modules.find({});
  return modules.map(filterModule);
};

const getModulesByRepoId = async (
  repoId: string,
): Promise<FilteredModulesType[] | Record<string, never>> => {
  const modules = await Modules.find({ repoId: repoId });
  return modules.map(filterModule);
};

const getAmount = async (slug: string) => {
  const result = await Modules.findOne(
    { slug: slug },
    { softCopyPrice: 1, hardCopyPrice: 1 },
  );
  return {
    softCopyPrice: result?.softCopyPrice,
    hardCopyPrice: result?.hardCopyPrice,
  };
};

const getFileId = async (productId: string) => {
  const result = await Modules.findOne({ slug: productId });
  return result?.fileId;
};

export { getModules, getModulesByRepoId, getAmount, getFileId };
