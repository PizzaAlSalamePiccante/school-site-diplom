import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = new Router();

router.post('/registration',
    body('login').isLength({min: 6, max: 32}),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

export default router;