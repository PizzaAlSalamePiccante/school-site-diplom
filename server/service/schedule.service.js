import ApiError from "../exceptions/api.error.js";
import classModel from "../models/class.model.js";
import scheduleModel from "../models/schedule.model.js";

class ScheduleService {
    async create (scheduleData) {
        const { classId, schedule} = scheduleData;

        const classExists = await classModel.findById(classId);
        if (!classExists) {
            throw ApiError.BadRequest(`Class ${classId} not found`);
        }

        const createdSchedule = await scheduleModel.create({
            classId,
            schedule,
        });

        return createdSchedule;
    }
    async update (scheduleData) {
        const { scheduleId, schedule } = scheduleData;

        const scheduleToUpdate = await scheduleModel.findById(scheduleId);
        if (!scheduleToUpdate) {
            throw ApiError.BadRequest(`Schedule ${scheduleId} not found`);
        }

        scheduleToUpdate.schedule = schedule;
        const updatedSchedule = await scheduleToUpdate.save();

        return updatedSchedule;
    }
    async delete (scheduleId) {
        const scheduleToDelete = await scheduleModel.findById(scheduleId);
        if (!scheduleToDelete) {
             throw ApiError.BadRequest(`Schedule ${scheduleId} not found`);
        }

        const deletedSchedule = await scheduleModel.deleteOne({ _id: scheduleId });

        return deletedSchedule;
    }
}

export default new ScheduleService();