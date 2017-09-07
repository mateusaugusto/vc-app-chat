import express = require("express");
var ObjectId = require('mongoose').Types.ObjectId;
import {IUnreadModel} from "../interface/unread/iunread-model";
import {UnreadModel} from "../schema/unread-schema";

export class UnreadController {

    public static create(req: express.Request, res: express.Response): void {
        var unread: IUnreadModel = <IUnreadModel>req.body;
        UnreadModel.create(unread, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    public static removeUserFromList(req: express.Request, res: express.Response): void {
        var unread = req.body.unreadmessages.unread;
        var user = req.body.user;

        UnreadModel.findOneAndUpdate({_id: unread._id},
            {$pull: {user: user._id}}, (error, result) => {
                if (error) res.send({"error": "error"});
                else if (null === result)
                    res.status(400).send('not found');
                else {
                    res.send(result);
                }
            });
    };

    public static contByRoomAdnUser(req: express.Request, res: express.Response): void {
        let userId = new ObjectId(req.params.userId);
        let roomId = new ObjectId(req.params.roomId);

        console.log("userId" + userId);
        console.log("roomId" + roomId);

        UnreadModel.count({room: roomId, user: { $in: [userId] }}, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                console.log("total" + result);
                res.send({count: result});
            }
        });
    };


}