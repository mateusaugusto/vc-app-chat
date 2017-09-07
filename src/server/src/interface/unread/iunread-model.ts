import * as mongoose from "mongoose";
import {IUnread} from "./iunread";

export interface IUnreadModel extends IUnread, mongoose.Document {
    _id: string;
}