import * as mongoose from "mongoose";
import {IRoom} from "./IRoom";

export interface IRoomModel extends IRoom, mongoose.Document {
}