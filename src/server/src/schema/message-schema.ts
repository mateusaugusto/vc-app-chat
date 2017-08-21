import * as mongoose from "mongoose";
import {IMessageModel} from "../interface/message/imessage-model";
import {Schema} from "mongoose";

const MessageSchema = new mongoose.Schema({
    room: [{ type: Schema.Types.ObjectId, ref: 'Room', index: true}],
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    created: Date,
    to: String,
    message: String
});

export const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);