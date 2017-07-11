import * as mongoose from "mongoose";
import {IRoom} from "./iroom";

export interface IRoomModel extends IRoom, mongoose.Document {
}