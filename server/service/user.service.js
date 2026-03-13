import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import ApiError from '../exceptions/api.error.js';
import userModel from "../models/user.model.js";
import UserDto from '../dtos/user.dto.js';
import studentModel from '../models/student.model.js';
import guardianModel from '../models/guardian.model.js';
import teacherModel from '../models/teacher.model.js';
import adminModel from '../models/admin.model.js';
import tokenService from './token.service.js';

class UserService {
    async userCreate (userData) {
        const {
            login, 
            password, 
            firstName,
            lastName,
            middleName
        } = userData;

        const candidate = await userModel.findOne({login});
        if (candidate) {
            throw ApiError.BadRequest(`User with this login already exists - ${login}`);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            login,
            password: hashPassword,
            firstName,
            lastName,
            middleName
        });

        return user;
    }
    async guardianCreate (guardianData) {
        const { 
            phone, 
            email,
            userData
        } = guardianData;
        const user = await this.userCreate(userData);
        const guardian = await guardianModel.create({
            user: user._id,
            phone,
            email,
        });
        return guardian;
    }
    async studentCreate (studentData) {
        const { 
            classId, 
            guardianId,
            userData
        } = studentData;
        const user = await this.userCreate(userData);
        const student = await studentModel.create({
            user: user._id,
            classId: classId,
            guardianId: guardianId || null,
        });
        return student;

    }
    async teacherCreate (teacherData) {
        const { 
            subjects,
            classId, 
            workEmail,
            workPhone,
            userData
        } = teacherData;
        const user = await this.userCreate(userData);
        const teacher = await teacherModel.create({
            user: user._id,
            subjects,
            homeroomClass: classId,
            workEmail,
            workPhone
        });
        return teacher;

    }
    async adminCreate (adminData) {
        const { 
            canManageSchedule,
            canManagePosts, 
            canManageTeachers,
            canManageStudents,
            canManageGuardians,
            canManageAdmins,
            canViewLogs,
            userData
        } = adminData;
        const user = await this.userCreate(userData);
        const admin = await adminModel.create({
            user: user._id,
            canManageSchedule,
            canManagePosts,
            canManageTeachers,
            canManageStudents,
            canManageGuardians,
            canManageAdmins,
            canViewLogs
        });
        return admin;
    }

    async login (login, password) {

        const user = await userModel.findOne({login});
        if (!user) {
            throw ApiError.BadRequest(`User with login ${login} not exists`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Incorrect password`);
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Я изменил на 30 дней и в сервисе пока что

        await tokenService.saveToken(userDto.id, tokens.refreshToken, expiresAt);

        return {...tokens, user: userDto}
    }
    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
    async changePassword (userData) {
        const { userId, oldPassword, newPassword } = userData;
        if (!oldPassword || !newPassword) {
            throw ApiError.BadRequest('Old password and new password are required'); // защита
        }
        
        const user = await userModel.findById(userId);
        if (!user) {
            throw ApiError.BadRequest(`User ${userId} not exist`);
        }

        const isPassEquals = await bcrypt.compare(oldPassword, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Incorrect password`);
        }

        const hashPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashPassword;

        const userWithChangedPassword = await user.save();

        return userWithChangedPassword;
    }
}

export default new UserService();