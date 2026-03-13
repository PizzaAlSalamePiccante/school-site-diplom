import {Schema, model} from 'mongoose';

const Post = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, enum: ['news', 'announcement', 'event'], default: 'news'},
}, { timestamps: true });

export default model('Post', Post);