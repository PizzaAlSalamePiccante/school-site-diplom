import { Router } from "express";
import scheduleController from "../controllers/schedule.controller.js";

const router = new Router();

router.post('/', scheduleController.create);
router.put('/:scheduleId', scheduleController.update);
router.delete('/:scheduleId', scheduleController.delete)

export default router;