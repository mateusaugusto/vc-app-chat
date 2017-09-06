import {UnreadMessagesModel} from "../schema/unreadmessages-schema";
import express = require("express");
import {IUnreadMessageModel} from "../interface/unreadmessages/iunreadmessages-model";
import {IUser} from "../interface/user/iuser";
var mongoose = require('mongoose');

export class UnreadMessagesController {

    public static create(req: express.Request, res: express.Response): void {
        var unread: IUnreadMessageModel = <IUnreadMessageModel>req.body;
        UnreadMessagesModel.create(unread, (error, result) => {
            if (error) res.send({"error": "error"});
            else res.send(result);
        });
    };

    public static removeUserFromList(req: express.Request, res: express.Response): void {
        var unread: IUnreadMessageModel = <IUnreadMessageModel>req.body.unreadmessages;
        var user: IUser = <IUser>req.body.user;

        console.log(unread);
        console.log(user);

        UnreadMessagesModel.findOneAndUpdate({unread},
            {$pull: {user: [user]}}, (error, result) => {
                if (error) res.send({"error": "error"});
                else if(null === result )
                    res.status(400).send('not found');
                else {
                    res.send(result);
                }
            });
    };

}