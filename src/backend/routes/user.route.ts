import express = require("express");
import {IUser, User} from "../../models/model/user.model";
let userRouter = express.Router();
let uri = "/user"

userRouter.get("/user", function(req, res) {
    console.log("user");
});

userRouter.post(uri, (req, res) => {
    var user: IUser = <IUser>req.body;

    User.create(user).subscribe(
        room => {
            res.send(room);
        },
        error => {
            res.status(500);
            //res.render('error', { error: error });
            console.log(error);
        }
    );

});

userRouter.put(uri, (req, res) => {
    var user: IUser = <IUser>req.body;
    User.update(user).subscribe(
        room => {
            res.send(room);
        },
        error => {
            res.status(500);
            //res.render('error', { error: error });
            console.log(error);
        }
    );
});

userRouter.put(uri + "add/room/:roomId/domainId/:domainId/accountId/:366", (req, res) => {
    var user: IUser = <IUser>req.body;
    User.insertRoomToUser(user, req.params.roomId).subscribe(
        room => {
            res.send(room);
        },
        error => {
            res.status(500);
            //res.render('error', { error: error });
            console.log(error);
        }
    );
});

export = userRouter;
