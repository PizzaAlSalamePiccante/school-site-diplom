import {Schema, model} from 'mongoose';

const User = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String, required: true}
});

export default model('User', User);