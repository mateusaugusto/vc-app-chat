import * as mongoose from "mongoose";
import {IUserModel} from "../interface/user/iuser-model";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    domainId: { type: Number, required: true},
    accountId: { type: Number, required: true },
    userRooms: [{ type: Number, ref: 'Room' }]
}).index({domainId: 1, accountId: 1}, {unique: true});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);