import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");
import {RoomModel} from "../schema/room-schema";
import {IRoom} from "../index";

export class RoomController {

    public static find(req: express.Request, res: express.Response): void {
        var name = req.params.name;
        console.log("route" + name);
        RoomModel.find({name}, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                res.send(result);
                console.log("result" + result);
            }
        });
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

        console.log(userRom);
        console.log(user);

        RoomModel.find({
            domainId: domainId, accountId: accountId,
            '$or': [
                {usersRoom: [userRom, user]},
                {usersRoom: [user, userRom]}
            ]}, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                res.send(result);
            }
        });
    };
}