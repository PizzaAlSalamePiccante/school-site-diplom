import {Schema, model} from 'mongoose';

const ClassModel = new Schema({
    className: {type: String, unique: true, required: true}
});

export default model('Class', ClassModel);