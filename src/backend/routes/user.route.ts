import express = require("express");
import {IUser, User} from "../../models/user.model";
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
            res.render('error', { error: error });
            console.log(error);
        }
    );

});

export = userRouter;
