import postService from "../service/post.service.js";

class PostController {
    async create (req, res, next) {
        try {
            const { 
                userId,
                title,
                content,
                category
             } = req.body; 
             const { image } = req.files;

             const post = await postService.create({
                userId, 
                title, 
                content, 
                category, 
                image
            });
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }
    async update (req, res, next) {
        try {
            const {
                title,
                content,
                category
            } = req.body;
            const { image } = req.files;
            const { postId } = req.params;

            const post = await postService.update({
                postId,
                title,
                content,
                category,
                image
            });
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }
    async delete (req, res, next) {
        try {
            const { postId } = req.params;
            const deletedPost = await postService.delete(postId);
            return res.json(deletedPost);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();