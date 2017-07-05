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
        error => console.log(error.stack)
    );

});

export = userRouter;
