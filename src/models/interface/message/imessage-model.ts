import * as mongoose from "mongoose";
import {IMessage} from "./imessage";

export interface IMessageModel extends IMessage, mongoose.Document {
}