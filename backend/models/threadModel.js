import mongoose, {Schema} from "mongoose";
import {MessageSchema} from "./messageModel.js";

const ThreadSchema = new Schema({
    threadId : {
        type : String,
        required : true,
        unique: true
    },

    title: {
        type : String,
        default: "New Chat"
    },

    messages : [MessageSchema],
    createdAt : {
        type : Date,
        default : Date.now
    },

    updatedAt : {
        type : Date,
        default: Date.now
    }
});

const ThreadModel = mongoose.model('Thread', ThreadSchema);
export default ThreadModel;