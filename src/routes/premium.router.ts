import { Router } from "express";
import {
  getPremium,
  // handleAddUser,
  handleGetFiles,
  handleGetData,
  handleGetSubjects,
} from "../controllers/premium.controller.js";

const router = Router();

router.get("/", getPremium);
router.get("/subjects", handleGetSubjects);
router.get("/data", handleGetData);
router.get("/files", handleGetFiles);

// router.post("/addUser", handleAddUser);

export default router;
