import { Router } from "express";
import {
  getAllModules,
  getModulesByRepoId,
} from "../controllers/modules.controller";

const router = Router();

router.get("/", getAllModules);
router.get("/:repoId", getModulesByRepoId);

export default router;
