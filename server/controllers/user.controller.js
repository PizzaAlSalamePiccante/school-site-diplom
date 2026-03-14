import ApiError from "../exceptions/api.error.js";
import userService from "../service/user.service.js";

class UserController {
    async studentRegistration (req, res, next) {
        try {
            const { studentData, userData } = req.body;
            if (!studentData || !userData) throw ApiError.BadRequest('Missing required fields');
            const student = await userService.studentCreate({...studentData, userData});
            res.json(student);
        } catch (e) {
            next(e);
        }
    }
    async guardianRegistration (req, res, next) {
        try {
            const { guardianData, userData } = req.body;
            if (!guardianData || !userData) throw ApiError.BadRequest('Missing required fields');
            const guardian = await userService.guardianCreate({...guardianData, userData});
            res.json(guardian);
        } catch (e) {
            next(e);
        }
    }
    async teacherRegistration (req, res, next) {
        try {
            const { teacherData, userData } = req.body;
            if (!teacherData || !userData) throw ApiError.BadRequest('Missing required fields');
            const teacher = await userService.teacherCreate({...teacherData, userData});
            res.json(teacher);
        } catch (e) {
            next(e);
        }
    }
    async adminRegistration (req, res, next) {
        try {
            const { adminData, userData } = req.body;
            if (!adminData || !userData) throw ApiError.BadRequest('Missing required fields');
            const admin = await userService.adminCreate({...adminData, userData});
            res.json(admin);
        } catch (e) {
            next(e);
        }
    }
    async login (req, res, next) {
        try {
            const { login, password } = req.body;
            if (!login || !password) throw ApiError.BadRequest('Missing required fields');
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
            if (!refreshToken) throw ApiError.BadRequest('Missing required fields');
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
            if (!refreshToken) throw ApiError.BadRequest('Missing required fields');
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
            if (!oldPassword || !newPassword) throw ApiError.BadRequest('Missing required fields');
            const userId = req.user.id;
            const user = await userService.changePassword({userId, oldPassword, newPassword});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();