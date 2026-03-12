import scheduleService from "../service/schedule.service.js";

class ScheduleController {
    async createSchedule (req, res, next) {
        try {
            const { classId, schedule } = req.body;
            const createdSchedule = await scheduleService.createSchedule({classId, schedule});
            res.json(createdSchedule);
        } catch (e) {
            next(e);
        }
    }
    async updateSchedule (req, res, next) {
        try {
            const { scheduleId } = req.params;
            const { schedule } = req.body;
            const updatedSchedule = await scheduleService.updateSchedule({scheduleId, schedule});
            res.json(updatedSchedule);
        } catch (e) {
            next(e);
        }
    }
    async deleteSchedule (req, res, next) {
        try {
            const { scheduleId } = req.params;
            const deletedSchedule = await scheduleService.deleteSchedule(scheduleId);
            res.json(deletedSchedule);
        } catch (e) {
            next(e);
        }
    }
}

export default new ScheduleController();