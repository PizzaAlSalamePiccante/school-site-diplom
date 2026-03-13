import * as uuid from 'uuid';
import * as path from 'path';
import ApiError from '../exceptions/api.error.js';

class ImageService {
    saveImage(image) {
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
}

export default new ImageService();