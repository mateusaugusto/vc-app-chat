import express = require("express");
import {User} from "../../models/model/user.model";
import {IUser} from "../../models/interface/user/iuser";
import {UserModel} from "../../models/schema/user-schema";
let userRouter = express.Router();
let uri = "/user";


userRouter.get("/user/:id", (req, res) => {
    var clientId = req.params.id;
    console.log("meu id" + clientId);

    UserModel.findOne({clientId}, (err, user) => {
        if (err) {
            res.json({info: 'error during find players', error: err});
        }
        res.json(user);
    });


    /* User.findOne(req.params.id).subscribe(
     user => {
     console.log("find aqui" + user.name);
     res.send(user);
     },
     error => {
     res.status(500);
     //res.render('error', { error: error });
     console.log(error);
     }
     );*/


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
