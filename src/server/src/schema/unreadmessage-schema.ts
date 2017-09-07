import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IUnreadModel} from "../interface/unreadmessage/iunreadmessage-model";

export const UnreadSchema = new mongoose.Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User', index: true}],
    room: { type: Schema.Types.ObjectId, ref: 'Room', index: true },
});
export const UnreadModel = mongoose.model<IUnreadModel>('Unread', UnreadSchema);