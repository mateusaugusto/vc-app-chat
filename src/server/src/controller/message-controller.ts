import {MessageModel} from "../schema/message-schema";
import express = require("express");

export class MessageController {

    public static findOne(req: express.Request, res: express.Response) {
        let room = req.params.room;
        console.log("findone message" + room);

        MessageModel.find({room}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('Client not found');
            else res.send(result)
        }).populate("user");
    };

    public static findMessages(req: express.Request, res: express.Response) {
        let text = req.params.text;
        let room = req.params.room;
        MessageModel.find({room, message: new RegExp(text, 'i')}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('message not found');
            else res.send(result)
        }).populate("user");
    };

}