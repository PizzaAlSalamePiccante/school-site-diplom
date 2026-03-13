import ApiError from "../exceptions/api.error.js";
import imageService from "./image.service.js";
import postModel from "../models/post.model.js";
import userModel from '../models/user.model.js';

class PostService {
    async createPost (postData) {  
        const {
            userId,
            title,
            content,
            image,
            category
        } = postData;

        const isUserExist = await userModel.findById(userId);
        if (!isUserExist) {
            throw ApiError.BadRequest(`User ${userId} not found`);
        }
        if (!title || !content || !image || !category) {
            //throw ApiError.BadRequest(`All fields must be filled in`);
        }

        const imageName = imageService.saveImage(image);

        const createdPost = await postModel.create({
            user: userId,
            title,
            content,
            image: imageName,
            category
        });

        return createdPost;
    }
}

export default new PostService();