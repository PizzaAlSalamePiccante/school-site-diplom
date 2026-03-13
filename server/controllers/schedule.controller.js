import scheduleService from "../service/schedule.service.js";

class ScheduleController {
    async create (req, res, next) {
        try {
            const { classId, schedule } = req.body;
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
            const updatedSchedule = await scheduleService.update({scheduleId, schedule});
            res.json(updatedSchedule);
        } catch (e) {
            next(e);
        }
    }
    async delete (req, res, next) {
        try {
            const { scheduleId } = req.params;
            const deletedSchedule = await scheduleService.delete(scheduleId);
            res.json(deletedSchedule);
        } catch (e) {
            next(e);
        }
    }
}

export default new ScheduleController();