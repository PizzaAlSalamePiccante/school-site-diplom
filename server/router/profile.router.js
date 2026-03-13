import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.post('/password', authMiddleware, userController.changePassword);

export default router;