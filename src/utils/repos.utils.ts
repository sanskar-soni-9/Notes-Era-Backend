import Repos, { ReposType, ReposDocument } from "../models/repos.model";

const filterRepo = (repo: ReposDocument): ReposType => ({
  repoId: repo.repoId,
  name: repo.name,
  about: repo?.about,
});

const getRepos = async (): Promise<ReposType[]> => {
  const repos = await Repos.find();
  return repos.map(filterRepo);
};

const getRepoById = async (
  repoId: string,
): Promise<ReposType | Record<string, never>> => {
  const repo = await Repos.find({ repoId: repoId });
  return filterRepo(repo[0]);
};

export { getRepos, getRepoById };
