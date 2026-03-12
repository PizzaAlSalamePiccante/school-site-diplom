import {Schema, model} from 'mongoose';

const Guardian = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: false, required: true}
});

export default model('Guardian', Guardian);