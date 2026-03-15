import ApiError from "../exceptions/api.error.js";
import userModel from "../models/user.model.js";

class AdminService {
    async changeUserLogin (userData) {
        const { 
            userId,
            login
         } = userData;

        const user = await userModel.findById(userId);
        if (!user) {
            throw ApiError.BadRequest(`User ${userId} not found`);
        }

        if (login == user.login) {
            throw ApiError.BadRequest(`The login must be different from the previous one`);
        }

        const existingUser = await userModel.findOne({login});
        if (existingUser) {
            throw ApiError.BadRequest(`Login must be unique`);
        }

        user.login = login;
        await user.save();

        return user;
    }

}

export default new AdminService();