import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },

},{timestamps: true});

const Bloglike = mongoose.model('Bloglike', likeSchema, "bloglikes"); // Blog name / Blog model name
export default Bloglike;
