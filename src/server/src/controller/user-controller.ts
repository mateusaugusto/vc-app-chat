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

    public static insertUserToRoom(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
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
        let listPrivateUsers;

        if(req.headers['private-users']){
            console.log(req.headers['private-users']);
            listPrivateUsers = req.headers['private-users'];
        }

        UserModel.findOne({domainId: domainId, accountId: accountId, clientId: clientId}, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                var obj = result.toObject();
                obj['privateUsers'] = listPrivateUsers;
                res.send(obj);
            }
        }).populate("room");

    };

    public static findAllByDomainIdAndAccountId(req: express.Request, res: express.Response) {
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;
        let listPrivateUsers = JSON.parse(req.params.privateusers);

        console.log(req.params);

        UserModel.find({domainId: domainId, accountId: accountId, clientId: { $in: listPrivateUsers }}, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result)
        }).populate("room");
    };

}