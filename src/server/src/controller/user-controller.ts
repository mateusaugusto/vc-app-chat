import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");

export class UserController {

    create(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        UserModel.create(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    update(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        UserModel.update(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    insertRoomToUser(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        var roomId = req.params.roomId;
        user.userRooms.push(roomId);
        UserModel.update(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    public static findOneByDomainIdAndAccountIdAndClientId(req: express.Request, res: express.Response): void {
        var clientId = req.params.clientId;
        var domainId = req.params.domainId;
        var accountId = req.params.accountId;

        UserModel.findOne({domainId: domainId, accountId: accountId, clientId: clientId}, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };
}