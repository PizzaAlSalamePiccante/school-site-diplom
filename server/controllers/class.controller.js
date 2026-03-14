import ApiError from "../exceptions/api.error.js";
import classService from "../service/class.service.js";

class ClassController {
    async create (req, res, next) {
        try {
            const { className } = req.body;
            if (!className) throw ApiError.BadRequest('Missing required fields');
            const classData = await classService.create(className);
            return res.json(classData);
        } catch (e) {
            next(e);
        }
    }
    async update (req, res, next) {
        try {
            const { className } = req.body;
            const { classId } = req.params;
            if (!className || !classId) throw ApiError.BadRequest('Missing required fields');
            const classData = await classService.update({classId, className});
            return res.json(classData);
        } catch (e) {
            next(e);
        }
    }
    async delete (req, res, next) {
        try {
            const { classId } = req.params;
            if (!classId) throw ApiError.BadRequest('Missing required fields');
            const classData = await classService.delete(classId);
            return res.json(classData);
        } catch (e) {
            next(e);
        }
    }
    async getAll (req, res, next) {
        try {
            const classes = await classService.getAll();
            return res.json(classes);
        } catch (e) {
            next(e);
        }
    }
    async createStandard (req, res, next) {
        try {
            const { letters, grades } = req.body;
            if (!letters || !grades) throw ApiError.BadRequest('Missing required fields');
            const classes = await classService.createStandard({letters, grades});
            return res.json(classes);
        } catch (e) {
            next(e);
        }
    }
}

export default new ClassController();