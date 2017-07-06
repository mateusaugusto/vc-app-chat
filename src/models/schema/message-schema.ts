import * as mongoose from "mongoose";
import {IMessageModel} from "../interface/message/imessage-model";

const MessageSchema = new mongoose.Schema({
    room: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    to: String,
    message: String
});

export const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);