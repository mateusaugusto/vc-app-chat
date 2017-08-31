import * as mongoose from "mongoose";
import {IUser} from "./iuser";

export interface IUserModel extends IUser, mongoose.Document {
    _id: string;
}