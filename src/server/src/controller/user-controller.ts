import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");

export class UserController {

    public static create(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        UserModel.create(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    public static insertRoomToUser(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;

        console.log("req.params.roomId" + req.params.roomId);
        console.log("clientId" + user.clientId);
        console.log("domainId" + user.domainId);
        console.log("accountId" + user.accountId);

        UserModel.findOneAndUpdate({domainId: user.domainId, accountId: user.accountId, clientId: user.clientId},
            {$push: {"room": req.params.roomId}}, (error, result) => {
                if (error) res.send({"error": "error"});
                else {
                    res.send(result);
                    console.log("result" + result);
                }
            });
    };

    update(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        UserModel.update(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };


    public static findOneByDomainIdAndAccountIdAndClientId(req: express.Request, res: express.Response) {
        let clientId = req.params.clientId;
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;

        UserModel.findOne({domainId: domainId, accountId: accountId, clientId: clientId}, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result)
        }).populate("room");
    };

}