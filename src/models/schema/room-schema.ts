import * as mongoose from "mongoose";
import {IRoomModel} from "../interface/room/iroom-model";

export const RoomSchema = new mongoose.Schema({
    // _id : { type: Number },
    name: { type: String },
    domainId: { type: Number, unique: true },
    accountId: { type: Number, unique: true },
    created: Date,
}).index({domainId: 1, accountId: 1}, {unique: true});

export const RoomModel = mongoose.model<IRoomModel>('Room', RoomSchema);