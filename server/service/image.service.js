import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';
import ApiError from '../exceptions/api.error.js';

class ImageService {
    save(image) {
        try {
            const imageName = uuid.v4() + '.jpg';
            const uploadDir = path.resolve('static', 'images', 'post');
            const imagePath = path.join(uploadDir, imageName);
            image.mv(imagePath);
            return imageName;
        } catch (e) {
            throw ApiError.BadRequest(`Error in save image function ${e}`);
        }
    }
    async delete(imageName) {
        if (!imageName) return;
        const imagePath = path.resolve('static', 'images', 'post', imageName);
        
        try {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        } catch (e) {
            throw ApiError.BadRequest(`Error in delete image function ${e}`);
        }
    }
}

export default new ImageService();