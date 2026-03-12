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

class UserService {
    async userCreate (userData, session) {
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

        const hashPassword = await bcrypt.hash(password, 5);

        const [user] = await userModel.create([{
            login,
            password: hashPassword,
            firstName,
            lastName,
            middleName
        }], { session });

        return user;
    }
    async guardianCreate (guardianData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { 
                phone, 
                email,
                userData
            } = guardianData;

            const user = await this.userCreate(userData, session);

            const [guardian] = await guardianModel.create([{
                user: user._id,
                phone,
                email,
            }], { session });
            await session.commitTransaction();
            session.endSession();

            return guardian;
        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            throw ApiError.BadRequest(e.toString())
        }
    }
    async studentCreate (studentData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { 
                classId, 
                guardianId,
                userData
            } = studentData;

            const user = await this.userCreate(userData, session);

            const [student] = await studentModel.create([{
                user: user._id,
                classId: classId,
                guardian: guardianId || null,
            }], { session });
            await session.commitTransaction();
            session.endSession();

            return student;
        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            throw ApiError.BadRequest(e.toString())
        }

    }
    async teacherCreate (teacherData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { 
                subjects,
                classId, 
                workEmail,
                workPhone,
                userData
            } = teacherData;

            const user = await this.userCreate(userData, session);

            const [teacher] = await teacherModel.create([{
                user: user._id,
                subjects,
                homeroomClass: classId,
                workEmail,
                workPhone
            }], { session });
            await session.commitTransaction();
            session.endSession();

            return teacher;
        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            throw ApiError.BadRequest(e.toString())
        }

    }
    async adminCreate (adminData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
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

            const user = await this.userCreate(userData, session);

            const [admin] = await adminModel.create([{
                user: user._id,
                canManageSchedule,
                canManagePosts,
                canManageTeachers,
                canManageStudents,
                canManageGuardians,
                canManageAdmins,
                canViewLogs
            }], { session });
            await session.commitTransaction();
            session.endSession();

            return admin;
        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            throw ApiError.BadRequest(e.toString())
        }

    }
}

export default new UserService();