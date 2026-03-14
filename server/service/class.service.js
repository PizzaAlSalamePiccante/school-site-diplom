import ApiError from "../exceptions/api.error.js";
import classModel from "../models/class.model.js";
import studentModel from "../models/student.model.js";

class ClassService {
    async create (className) {

        if (await classModel.findOne({className})) {
            throw ApiError.BadRequest(`Class with this name ${className} already exists`);
        }

        const createdClass = await classModel.create({
            className
        });

        return createdClass;
    }
    async delete (classId) {
        const classToDelete = await classModel.findById(classId);
        if (!classToDelete) {
            throw ApiError.BadRequest(`Class with this id ${classId} don't exists`);
        }
        const studentsInClass = await studentModel.findOne({ classId });
        if (studentsInClass) {
            throw ApiError.BadRequest('Cannot delete class with students');
        }
        
        const deletedClass = await classModel.deleteOne({_id: classId});

        return deletedClass;
    }
    async update (classData) {
        const { classId, className } = classData;

        const classToUpdate = await classModel.findById(classId);
        if (!classToUpdate) {
            throw ApiError.BadRequest(`Class with this id ${classId} don't exists`);
        }

        classToUpdate.className = className;
        const updatedClass = await classToUpdate.save();

        return updatedClass;
    }
    async getAll () {
        return await classModel.find();
    }
    async createStandard(initOptions) {
        const { letters, grades } = initOptions;
        
        const classes = [];
        for (const grade of grades) {
            for (const letter of letters) {
                const className = `${grade}-${letter}`;
                try {
                    const newClass = await this.create(className);
                    classes.push(newClass);
                } catch (e) {
                    console.log(`Class ${className} already exists`);
                }
            }
        }
        
        return classes;
    }
}

export default new ClassService();