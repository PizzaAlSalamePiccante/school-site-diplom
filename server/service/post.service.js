import ApiError from "../exceptions/api.error.js";
import imageService from "./image.service.js";
import postModel from "../models/post.model.js";
import userModel from '../models/user.model.js';

class PostService {
    async create (postData) {  
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

        const imageName = imageService.save(image);

        const createdPost = await postModel.create({
            user: userId,
            title,
            content,
            image: imageName,
            category
        });

        return createdPost;
    }
    async update (postData) {
        const {
            postId,
            title,
            content,
            image,
            category
        } = postData;

        const postToUpdate = await postModel.findById(postId);
        if (!postToUpdate) {
            throw ApiError.BadRequest(`Post ${postId} not found`);
        }

        imageService.delete(postToDelete.image);

        postToUpdate.title = title;
        postToUpdate.content = content;
        postToUpdate.image = imageService.save(image);
        postToUpdate.category = category;

        const updatedPost = await postToUpdate.save();

        return updatedPost;
    }
    async delete (postId) {
        const postToDelete = await postModel.findById(postId);
        if (!postToDelete) {
            throw ApiError.BadRequest(`Post ${postId} not found`);
        }

        imageService.delete(postToDelete.image);
        
        const deletedPost = await postModel.deleteOne({ _id: postId })

        return deletedPost;
    }
}

export default new PostService();