import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IUnreadMessageModel} from "../interface/unreadmessages/iunreadmessages-model";

export const UnreadMessagesSchema = new mongoose.Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User',  index: true}],
    room: { type: Schema.Types.ObjectId, ref: 'Room' }
});
export const UnreadMessagesModel = mongoose.model<IUnreadMessageModel>('UnreadMessages', UnreadMessagesSchema);