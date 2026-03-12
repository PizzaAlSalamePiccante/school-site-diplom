import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = new Router();

router.post('/student', userController.studentRegistration);
router.post('/guardian', userController.guardianRegistration);
router.post('/teacher', userController.teacherRegistration);
router.post('/admin', userController.adminRegistration);

export default router;