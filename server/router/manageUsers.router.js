import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const router = new Router();

router.put('/change-login/:userId', adminController.changeUserLogin);
router.put('/reset-password/:userId', adminController.resetPassword);

export default router;