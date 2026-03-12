import {Schema, model} from 'mongoose';

const Schedule = new Schema({
    classId: {type: Schema.Types.ObjectId, ref: 'Class'},
    schedule: {type: JSON, require: true},
}, { timestamps: true });

export default model('Schedule', Schedule);