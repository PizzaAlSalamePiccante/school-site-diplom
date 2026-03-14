import { Router } from "express";
import classController from "../controllers/class.controller.js";

const router = new Router();

router.post('/create', classController.create);
router.put('/:classId', classController.update);
router.delete('/:classId', classController.delete);
router.post('/init', classController.createStandard);
router.get('/get', classController.getAll);

export default router;