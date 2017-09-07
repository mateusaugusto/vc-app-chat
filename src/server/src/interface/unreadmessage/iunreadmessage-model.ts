import * as mongoose from "mongoose";
import {IUnread} from "./iunreadmessage";

export interface IUnreadModel extends IUnread, mongoose.Document {
    _id: string;
}