import {RoomModel} from "../schema/room-schema";
import {IRoom} from "../index";
import express = require("express");

export class RoomController {

    public static find(req: express.Request, res: express.Response): void {
        var name = req.params.name;
        RoomModel.find({name}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if (null === result)
                res.status(400).send('room not found');
            else {
                res.send(result);
                console.log("result" + result);
            }
        }).where({isEnabled: true});
    };

    public static create(req: express.Request, res: express.Response): void {
        var room: IRoom = <IRoom>req.body;
        RoomModel.create(room, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                res.send(result);
            }
        });
    }

    public static findPrivateRoom(req: express.Request, res: express.Response): void {
        var userRom = req.params.userRoom;
        var user = req.params.user;
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;

        RoomModel.find({
            domainId: domainId, accountId: accountId,
            $or: [
                {usersRoom: [userRom, user]},
                {usersRoom: [user, userRom]}
            ]
        }, (error, result) => {
            if (error) res.send({"error": "error"});
            else if (null === result)
                res.status(400).send('private room not found');
            else {
                res.send(result);
            }
        }).where({isEnabled: true});
    };

    public static findAllPrivateRoom(req: express.Request, res: express.Response): void {
        var userId = req.params.userId;
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;

        console.log(userId);

        RoomModel.find({
                domainId: domainId, accountId: accountId, privateRoom: true,
                usersRoom: {$in: [userId]}
            },(error, result) => {
                if (error) res.send({"error": "error"});
                else if (null === result)
                    res.status(400).send('private room not found');
                else {
                    res.send(result);
                }
            }).where({isEnabled: true});
    };


    public static insertUserToPrivateRoom(req: express.Request, res: express.Response): void {
        var room: IRoom = <IRoom>req.body;
        var userRom = req.params.userRoom;
        var user = req.params.user;

        RoomModel.findOneAndUpdate({_id: room._id},
            {$pushAll: {usersRoom: [userRom, user]}}, (error, result) => {
                if (error) res.send({"error": "error"});
                else if (null === result)
                    res.status(400).send('not found');
                else {
                    res.send(result);
                }
            });
    };

    public static update(req: express.Request, res: express.Response): void {
        var room: IRoom = <IRoom>req.body;
        RoomModel.findOneAndUpdate({_id: room._id}, req.body, (error, result) => {
            if (error) res.send({"error": "error"});
            else if (null === result)
                res.status(400).send('not found');
            else res.send(result);
        });
    };

}