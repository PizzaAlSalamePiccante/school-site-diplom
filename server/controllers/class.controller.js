import classService from "../service/class.service.js";

class ClassController {
    async createClass (req, res, next) {
        try {
            const { className } = req.body;
            const classData = await classService.classCreate(className);
            return res.json(classData);
        } catch (e) {
            next(e);
        }
    }
    async getAllClasses (req, res, next) {
        try {
            const classes = await classService.getAllClasses();
            return res.json(classes);
        } catch (e) {
            next(e);
        }
    }
}

export default new ClassController();