import ApiError from "../exceptions/api.error.js";
import userService from "../service/user.service.js";

class UserController {
    async studentRegistration (req, res, next) {
        try {
            const { studentData, userData } = req.body;
            const student = await userService.studentCreate({...studentData, userData});
            res.json(student);
        } catch (e) {
            next(e);
        }
    }
    async guardianRegistration (req, res, next) {
        try {
            const { guardianData, userData } = req.body;
            const guardian = await userService.guardianCreate({...guardianData, userData});
            res.json(guardian);
        } catch (e) {
            next(e);
        }
    }
    async teacherRegistration (req, res, next) {
        try {
            const { teacherData, userData } = req.body;
            const teacher = await userService.teacherCreate({...teacherData, userData});
            res.json(teacher);
        } catch (e) {
            next(e);
        }
    }
    async adminRegistration (req, res, next) {
        try {
            const { adminData, userData } = req.body;
            const admin = await userService.adminCreate({...adminData, userData});
            res.json(admin);
        } catch (e) {
            next(e);
        }
    }
    async login (req, res, next) {
        try {
            const { login, password } = req.body;
            const userData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async changePassword (req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = req.user.id;
            const user = await userService.changePassword({userId, oldPassword, newPassword});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();