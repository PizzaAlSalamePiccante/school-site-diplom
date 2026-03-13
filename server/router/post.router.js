import { Router } from "express";
import postController from "../controllers/post.controller.js";

const router = new Router();

router.post('/', postController.create);
router.put('/:postId', postController.update);
router.delete('/:postId', postController.delete);

export default router;