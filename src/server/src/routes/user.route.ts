import { Router, Request, Response } from 'express';
import {UserController} from "../controller/user-controller";

let uri = "/user";
const userRouter: Router = Router();


userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/clienteId/:clientId', (req: Request, res: Response) => {
    UserController.findOneByDomainIdAndAccountIdAndClientId(req, res);
});

/*userRouter.get("/user/:id",
});*/
/*
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
});*/

export = userRouter;
