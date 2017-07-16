import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");
import {MessageModel} from "../schema/message-schema";

export class MessageController {

    public static findOne(req: express.Request, res: express.Response) {
        let name = req.params.name;
        MessageModel.find({room: name}, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result)
        }).populate("user");
    };

}