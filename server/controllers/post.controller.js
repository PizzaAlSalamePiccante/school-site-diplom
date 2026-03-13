import postService from "../service/post.service.js";

class PostController {
    async createPost (req, res, next) {
        try {
            const { 
                userId,
                title,
                content,
                category
             } = req.body; 
             const { image } = req.files;

             const post = await postService.createPost({
                userId, 
                title, 
                content, 
                category, 
                image
            });
            return res.json(post)
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();