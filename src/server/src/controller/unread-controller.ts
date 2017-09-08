import express = require("express");
var ObjectId = require('mongoose').Types.ObjectId;
import {IUnreadModel} from "../interface/unread/iunread-model";
import {UnreadModel} from "../schema/unread-schema";
import {UnreadMessagesDomain} from "../domain/unread-domain";
import {UserDomain} from "../domain/user-domain";

export class UnreadController {

    public static create(req: express.Request, res: express.Response): void {
        var result =  req.body;
    /*    var unread = new UnreadMessagesDomain();
        unread.room = result.room;
        unread.user = [];

        for(let user of result.user){
            unread.user.push(user);
        }*/

        UnreadModel.create(result, (error, result) => {
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



    public static removeByRoomAndUser(req: express.Request, res: express.Response): void {
        var room = req.body.room;
        var user = req.body.user;

        UnreadModel.update({room: room._id},
            {$pull: {user: { $in: [user._id]}}},  { multi: true } , (error, result) => {
                if (error) res.send({"error": "error"});
                else if (null === result)
                    res.status(400).send('not found');
                else {
                    res.send(result);
                }
            });
    };
}