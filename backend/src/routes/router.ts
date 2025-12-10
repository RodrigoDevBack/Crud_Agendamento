import { Router } from "express";

import { AppointmentRoutes } from "../controllers/appointments.ts";

const router = Router();

router.get("/", AppointmentRoutes.get);

router.get("/not_concluded", AppointmentRoutes.getNotConcluded);

router.get("/concluded", AppointmentRoutes.getConcluded);

router.post("/", AppointmentRoutes.create);

router.put("/", AppointmentRoutes.update);

router.patch("/status", AppointmentRoutes.updateStatus);

router.delete("/", AppointmentRoutes.delete);

export default router;
