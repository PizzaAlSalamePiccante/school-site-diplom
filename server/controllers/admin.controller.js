import ApiError from "../exceptions/api.error.js";
import adminService from "../service/admin.service.js";

class AdminController {
    async changeUserLogin (req, res, next) {
        try {
            const { login } = req.body;
            const { userId } = req.params;
            if (!login || !userId) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.changeUserLogin({login, userId});
            return res.json(user);
        } catch (e) {
           next(e); 
        }
    }
    async resetPassword (req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.resetPassword(userId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async updateStudentProfile (req, res, next) {
        try {
            const { classId, guardianId } = req.body;
            const { userId } = req.params;
            if (!userId || !classId || !guardianId) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.updateStudentProfile({classId, guardianId, userId});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async updateTeacherProfile (req, res, next) {
        try {
            const { homeroomClass, email, phone } = req.body;
            const { userId } = req.params;
            if (!userId || !homeroomClass || !email || !phone) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.updateTeacherProfile({userId, homeroomClass, email, phone});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async updateGuardianProfile (req, res, next) {
        try {
            const { email, phone } = req.body;
            const { userId } = req.params;
            if (!userId || !email || !phone) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.updateGuardianProfile({email, phone, userId});
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async updateAdminProfile (req, res, next) {
        try {
            const {
                canManageSchedule,
                canManagePosts,
                canManageTeachers,
                canManageStudents,
                canManageGuardians,
                canManageAdmins,
                canViewLogs
            } = req.body;
            const { userId } = req.params;
            if (!userId) throw ApiError.BadRequest('Missing required fields');
            const user = await adminService.updateAdminProfile({
                canManageSchedule, 
                canManagePosts, 
                canManageTeachers, 
                canManageStudents, 
                canManageGuardians, 
                canManageAdmins, 
                canViewLogs, 
                userId
            });
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new AdminController();