import {Schema, model} from 'mongoose';

const Schedule = new Schema({
    classId: {type: Schema.Types.ObjectId, ref: 'Class'},
    schedule: {type: JSON, require: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
});

export default model('Schedule', Schedule);