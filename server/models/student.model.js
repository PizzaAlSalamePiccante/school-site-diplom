import {Schema, model} from 'mongoose';

const Student = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    classId: {type: Schema.Types.ObjectId, ref: 'Class'},
    guardianId: {type: Schema.Types.ObjectId, ref: 'Guardian'}
});

export default model('Student', Student);