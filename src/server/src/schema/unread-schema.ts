import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IUnreadModel} from "../interface/unread/iunread-model";

export const UnreadSchema = new mongoose.Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    room: { type: Schema.Types.ObjectId, ref: 'Room', index: true },
    message: String,
});
export const UnreadModel = mongoose.model<IUnreadModel>('Unread', UnreadSchema);