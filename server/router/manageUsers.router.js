import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const router = new Router();

router.put('/login/:userId', adminController.changeUserLogin);

export default router;