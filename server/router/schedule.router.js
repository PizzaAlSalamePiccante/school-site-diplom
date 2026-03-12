import { Router } from "express";
import scheduleController from "../controllers/schedule.controller.js";

const router = new Router();

router.post('/', scheduleController.createSchedule);
router.put('/:scheduleId', scheduleController.updateSchedule);
router.delete('/:scheduleId', scheduleController.deleteSchedule)

export default router;