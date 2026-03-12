import {Schema, model} from 'mongoose';

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    deviceInfo: {type: String}
});

export default model('Token', Token);