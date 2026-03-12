import ApiError from "../exceptions/api.error.js";
import classModel from "../models/class.model.js";

class ClassService {
    async classCreate (className) {

        if (await classModel.findOne({className})) {
            throw ApiError.BadRequest(`Class with this name ${className} already exists`);
        }

        const createdClass = await classModel.create({
            className
        });

        return createdClass;
    }
    async getAllClasses () {
        return await classModel.find();
    }
}

export default new ClassService();