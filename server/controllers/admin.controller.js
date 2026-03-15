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
}

export default new AdminController();