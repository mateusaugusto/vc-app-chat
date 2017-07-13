import { Router, Request, Response } from 'express';
import {UserController} from "../controller/user-controller";

let uri = "/user";
const userRouter: Router = Router();


userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/clientId/:clientId', (req, res) => {
    console.log("route findClient");
    UserController.findOneByDomainIdAndAccountIdAndClientId(req, res);
});

userRouter.post(uri, (req, res) => {
    UserController.create(req, res);
});

userRouter.put(uri + "/add/room/:roomId", (req, res) => {
    console.log("route insertRoomToUser");
    UserController.insertRoomToUser(req, res);
});

/*userRouter.put(uri, (req, res) => {
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


});*/

export = userRouter;
