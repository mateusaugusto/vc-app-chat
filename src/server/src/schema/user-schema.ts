import * as mongoose from "mongoose";
import {IUserModel} from "../interface/user/iuser-model";
import {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    domainId: { type: Number},
    accountId: { type: Number},
    clientId: { type: Number},
    room: [{ type: Schema.Types.ObjectId, ref: 'Room'}]

}).index({domainId: 1, accountId: 1, clientId: 1}, {unique: true});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);