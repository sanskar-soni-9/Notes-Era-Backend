import { NextFunction, Request, Response } from "express";
import { ModulesType } from "src/models/modules.model";
import { ReposType } from "src/models/repos.model";
import {
  getFileId,
  getModules,
  getModulesByRepoId as getModulesById,
} from "../services/modules.service";
import { getRepoById, getRepos } from "../services/repos.service";
import { bindModulesToRepo, bindModulesToRepos } from "../utils/utils";
import { getFileStream } from "../utils/drive.utils";

const getAllModules = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const repos = await getRepos();
    const modules = await getModules();
    const bindedModules = bindModulesToRepos(repos, modules);
    res.json({
      isErr: false,
      status: "success",
      body: bindedModules,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isErr: true,
      status: "error",
      message: "Internal error occured while getting modules.",
    });
    next(err);
  }
};

const getModulesByRepoId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { repoId } = req.params;
    const modules = await getModulesById(repoId);
    const repo = await getRepoById(repoId);
    if (repo) {
      const bindedModules = bindModulesToRepo(
        repo as ReposType,
        modules as ModulesType[],
      );
      res.json({
        isErr: false,
        status: "success",
        body: { data: bindedModules },
      });
    } else {
      res.json({
        isErr: false,
        status: "failed",
        body: {},
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isErr: true,
      status: "error",
      message: "Internal error occured while getting modules.",
    });
    next(err);
  }
};

const streamDownloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const fileId = await getFileId(slug);
    if (!fileId) throw new Error(`No file found for slug: ${slug}`);

    const file = await getFileStream(fileId);
    file
      .on("end", () => res.end())
      .on("error", () => {
        throw new Error(
          `Error occured while getting file stream from drive. fileId: ${fileId}, slug: ${slug}`,
        );
      })
      .pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      isErr: true,
      status: "error",
      message: "Internal error occured while getting modules.",
    });
    next(err);
  }
};

export { getAllModules, getModulesByRepoId, streamDownloadFile };
