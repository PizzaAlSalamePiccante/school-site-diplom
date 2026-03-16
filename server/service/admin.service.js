import generator from 'generate-password';
import bcrypt from 'bcrypt';
import ApiError from "../exceptions/api.error.js";
import userModel from "../models/user.model.js";
import studentModel from '../models/student.model.js';
import teacherModel from '../models/teacher.model.js';
import guardianModel from '../models/guardian.model.js';
import adminModel from '../models/admin.model.js';

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
    async resetPassword (userId) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw ApiError.BadRequest(`User ${userId} not found`);
        }

        const tempPassword = generator.generate({
            length: 8,
            numbers: true,
            uppercase: true,
            lowercase: true,
            excludeSimilarCharacters: true,
            strict: true
        });

        const hashPassword = await bcrypt.hash(tempPassword, 10);

        user.password = hashPassword;
        const updatedUser = await user.save();

        return {
            updatedUser,
            tempPassword
        };

    }
    async updateStudentProfile (studentData) {
        const {
            userId,
            classId,
            guardianId
        } = studentData;

        const student = await studentModel.findOne({user: userId});
        if (!student) {
            throw ApiError.BadRequest(`Student ${userId} not found`);
        }

        student.classId = classId;
        student.guardianId = guardianId;

        const updatedStudent = await student.save();

        return updatedStudent;
    }
    async updateTeacherProfile (teacherData) {
        const {
            userId,
            email,
            phone,
            homeroomClass
        } = teacherData;

        const teacher = await teacherModel.findOne({user: userId});
        if (!teacher) {
            throw ApiError.BadRequest(`Teacher ${userId} not found`);
        }

        teacher.phone = phone;
        teacher.email = email;
        teacher.homeroomClass = homeroomClass;

        const updatedTeacher = await teacher.save();

        return updatedTeacher;
    }
    async updateGuardianProfile (guardianData) {
        const {
            userId,
            email,
            phone
        } = guardianData;

        const guardian = await guardianModel.findOne({user: userId});
        if (!guardian) {
            throw ApiError.BadRequest(`Guardian ${userId} not found`);
        }

        guardian.phone = phone;
        guardian.email = email;

        const updatedGuardian = await guardian.save();

        return updatedGuardian;
    }
    async updateAdminProfile (adminData) {
        const {
            userId,
            canManageSchedule,
            canManagePosts,
            canManageTeachers,
            canManageStudents,
            canManageGuardians,
            canManageAdmins,
            canViewLogs
        } = adminData;

        const admin = await adminModel.findOne({user: userId});
        if (!admin) {
            throw ApiError.BadRequest(`Admin ${userId} not found`);
        }

        admin.canManageSchedule = canManageSchedule !== undefined ? canManageSchedule : admin.canManageSchedule;
        admin.canManagePosts = canManagePosts !== undefined ? canManagePosts : admin.canManagePosts;
        admin.canManageTeachers = canManageTeachers !== undefined ? canManageTeachers : admin.canManageTeachers;
        admin.canManageStudents = canManageStudents !== undefined ? canManageStudents : admin.canManageStudents;
        admin.canManageGuardians = canManageGuardians !== undefined ? canManageGuardians : admin.canManageGuardians;
        admin.canManageAdmins = canManageAdmins !== undefined ? canManageAdmins : admin.canManageAdmins;
        admin.canViewLogs = canViewLogs !== undefined ? canViewLogs : admin.canViewLogs;

        const updatedAdmin= await admin.save();

        return updatedAdmin;
    }
}

export default new AdminService();