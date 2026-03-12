import {Schema, model} from 'mongoose';

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
    expiresAt: {type: Date, required: true},
    deviceInfo: {type: String}
});

Token.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

export default model('Token', Token);