import {Schema, model} from 'mongoose';

const Admin = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    canManageSchedule: {type: Boolean, default: false},
    canManagePosts: {type: Boolean, default: false},
    canManageTeachers: {type: Boolean, default: false},
    canManageStudents: {type: Boolean, default: false},
    canManageGuardians: {type: Boolean, default: false},
    canManageAdmins: {type: Boolean, default: false},
    canViewLogs: {type: Boolean, default: false},
});

export default model('Admin', Admin);