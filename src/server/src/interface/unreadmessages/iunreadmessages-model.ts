import * as mongoose from "mongoose";
import {IUnreadMessages} from "./iunreadmessages";

export interface IUnreadMessageModel extends IUnreadMessages, mongoose.Document {
    _id: string;
}