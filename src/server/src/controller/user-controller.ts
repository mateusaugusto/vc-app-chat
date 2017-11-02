import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");
var mongoose = require('mongoose');
export class UserController {

    public static create(req: express.Request, res: express.Response): void {
        var user = {
            clientId: req.params.clientId,
            domainId: req.params.domainId,
            accountId: req.params.accountId,
            name: req.params.name
        }
        console.log(user);
        UserModel.create(user, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    public static insertUserToRoom(req: express.Request, res: express.Response): void {
        let clientId = req.params.clientId;
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;

        UserModel.findOneAndUpdate({domainId: domainId, accountId: accountId, clientId: clientId},
            {$push: {"room": req.params.roomId}}, (error, result) => {
                if (error) res.send({"error": "error"});
                else {
                    res.send(result);
                    console.log("result" + result);
                }
            });
    };

    public static update(req: express.Request, res: express.Response): void {
        var user: IUser = <IUser>req.body;
        UserModel.findOneAndUpdate({_id: user._id}, req.body, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('not found');
            else res.send(result);
        });
    };

    public static findOneByDomainIdAndAccountIdAndClientId(req: express.Request, res: express.Response) {
        let clientId = req.params.clientId;
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;
        let listPrivateUsers;
        let token;

        if(req.headers['private-users']){
            listPrivateUsers = req.headers['private-users'];
        }

        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }

        UserModel.findOne({domainId: domainId, accountId: accountId, clientId: clientId}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('Client not found');
            else {
                var obj = result.toObject();
                // Se o token vier do header
                //obj['privateUsers'] = listPrivateUsers;
                //obj['token'] = token;
                res.send(obj);
            }
        }).populate("room").where({isEnabled: true});

    };

    public static findAllByDomainIdAndAccountId(req: express.Request, res: express.Response) {
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;
        let listPrivateUsers = JSON.parse(req.params.privateusers);

        UserModel.find({domainId: domainId, accountId: accountId, clientId: { $in: listPrivateUsers }}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('not found');
            else res.send(result)
        }).where({isEnabled: true}).populate("room");
    };

    public static findAllUsersInRoom(req: express.Request, res: express.Response) {
        let domainId = req.params.domainId;
        let accountId = req.params.accountId;
        let roomId = mongoose.Types.ObjectId(req.params.roomId);

        UserModel.find({domainId: domainId, accountId: accountId, room: roomId}, (error, result) => {
            if (error) res.send({"error": "error"});
            else if(null === result )
                res.status(400).send('not found');
            else res.send(result)
        });
    };

}