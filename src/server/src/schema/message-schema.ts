import * as mongoose from "mongoose";
import {IMessageModel} from "../interface/message/imessage-model";
import {Schema} from "mongoose";

const MessageSchema = new mongoose.Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    created: Date,
    to: String,
    message: {type: String, index: true}
});
export const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);