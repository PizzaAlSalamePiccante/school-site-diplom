import { Router } from "express";
import classController from "../controllers/class.controller.js";

const router = new Router();

router.post('/create', classController.createClass);
router.get('/get', classController.getAllClasses);

export default router;