import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");
import {MessageModel} from "../schema/message-schema";
import {IRoom} from "../interface/room/iroom";

export class MessageController {

    public static findOne(req: express.Request, res: express.Response) {
        let room = req.params.room;
        MessageModel.find({room}, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result)
        }).populate("user");
    };

}