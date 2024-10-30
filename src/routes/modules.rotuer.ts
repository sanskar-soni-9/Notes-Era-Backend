import { Router } from "express";
import {
  getAllModules,
  getModulesByRepoId,
  // streamDownloadFile,
} from "../controllers/modules.controller";

const router = Router();

router.get("/", getAllModules);
router.get("/:repoId", getModulesByRepoId);
// router.get("/download/:slug", streamDownloadFile);

export default router;
