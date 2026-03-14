import ApiError from "../exceptions/api.error.js";
import adminModel from "../models/admin.model.js";

export default function checkPermission (permission) {
    return async (req, res, next) => {
        try {
            const admin = await adminModel.findOne({ user: req.user.id });
            if (!admin || !admin[permission]) {
                throw ApiError.Forbidden('No access');
            }
        } catch (e) {
            next(e);
        }
    }
}