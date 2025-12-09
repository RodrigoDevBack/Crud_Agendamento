import { Router } from "express";

import {
  getAppoin,
  createAppoin,
  deleteAppoin,
  updateStatus,
  getNotConcludedAppoin,
  getConcludedAppoin,
} from "../controllers/appointments.ts";

const router = Router();

router.get("/", getAppoin);

router.get("/not_concluded", getNotConcludedAppoin);

router.get("/concluded", getConcludedAppoin);

router.post("/", createAppoin);

router.put("/status", updateStatus);

router.delete("/", deleteAppoin);

export default router;
