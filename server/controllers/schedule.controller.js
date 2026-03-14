import scheduleService from "../service/schedule.service.js";

class ScheduleController {
    async create (req, res, next) {
        try {
            const { classId, schedule } = req.body;
            if (!classId || !schedule) throw ApiError.BadRequest('Missing required fields');
            const createdSchedule = await scheduleService.create({classId, schedule});
            res.json(createdSchedule);
        } catch (e) {
            next(e);
        }
    }
    async update (req, res, next) {
        try {
            const { scheduleId } = req.params;
            const { schedule } = req.body;
            if (!scheduleId || !schedule) throw ApiError.BadRequest('Missing required fields');
            const updatedSchedule = await scheduleService.update({scheduleId, schedule});
            res.json(updatedSchedule);
        } catch (e) {
            next(e);
        }
    }
    async delete (req, res, next) {
        try {
            const { scheduleId } = req.params;
            if (!scheduleId) throw ApiError.BadRequest('Missing required fields');
            const deletedSchedule = await scheduleService.delete(scheduleId);
            res.json(deletedSchedule);
        } catch (e) {
            next(e);
        }
    }
}

export default new ScheduleController();