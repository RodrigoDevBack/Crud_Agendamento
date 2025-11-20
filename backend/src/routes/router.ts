import { Router } from "express";
import type { Request, Response } from "express";

import { getAppoin, createAppoin, deleteAppoin } from "../controllers/appointments.ts";

const router = Router();

router.get("/", getAppoin);

router.post("/", createAppoin);

router.delete("/", deleteAppoin);


export default router;
