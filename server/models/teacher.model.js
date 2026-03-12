import {Schema, model} from 'mongoose';

const Teacher = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    subjects: [{type: String, required: true}],
    homeroomClass: {type: Schema.Types.ObjectId, ref: 'Class'},
    workEmail: {type: String, unique: true, required: true},
    workPhone: {type: String, unique: false, required: true}
});

export default model('Teacher', Teacher);