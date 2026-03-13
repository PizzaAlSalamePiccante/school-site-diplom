import { Router } from "express";
import postController from "../controllers/post.controller.js";

const router = new Router();

router.post('/', postController.createPost);
//router.put('/:scheduleId', scheduleController.updateSchedule);
//router.delete('/:scheduleId', scheduleController.deleteSchedule)

export default router;