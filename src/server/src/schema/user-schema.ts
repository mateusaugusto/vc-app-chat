import * as mongoose from "mongoose";
import {IUserModel} from "../interface/user/iuser-model";
import {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    domainId: { type: Number, required: true},
    accountId: { type: Number, required: true },
    clientId: { type: Number, required: true },
    room: [{ type: Schema.Types.ObjectId, ref: 'Room', unique: true}],

}).index({domainId: 1, accountId: 1, clientId: 1}, {unique: true});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);