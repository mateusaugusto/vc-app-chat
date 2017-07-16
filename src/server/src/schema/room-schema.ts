import * as mongoose from "mongoose";
import {IRoomModel} from "../interface/room/iroom-model";

export const RoomSchema = new mongoose.Schema({
    name: { type: String },
    domainId: { type: Number},
    accountId: { type: Number},
    created: Date,
}).index({domainId: 1, accountId: 1, name: 1}, {unique: true});

export const RoomModel = mongoose.model<IRoomModel>('Room', RoomSchema);