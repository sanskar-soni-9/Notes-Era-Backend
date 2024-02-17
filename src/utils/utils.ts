import { createHmac } from "crypto";
import { ModulesType } from "../models/modules.model";
import { ReposType } from "../models/repos.model";

const bindModulesToRepo = (repo: ReposType, modules: ModulesType[]) => ({
  ...repo,
  modules: modules.filter((module) => module.repoId === repo.repoId),
});

const bindModulesToRepos = (repos: ReposType[], modules: ModulesType[]) => {
  const reposWithModules = repos.map((repo) =>
    bindModulesToRepo(repo, modules),
  );
  return reposWithModules;
};

const generateHMAC = (data: string, secret?: string) => {
  const hmac = createHmac("sha256", secret || process.env.HMAC_SECRET!);
  hmac.update(data);
  return hmac.digest("hex");
};

export { bindModulesToRepo, bindModulesToRepos, generateHMAC };
