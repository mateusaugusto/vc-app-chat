import { Router, Request, Response } from 'express';
import {UserController} from "../controller/user-controller";

let uri = "/user";
const userRouter: Router = Router();

userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/clientId/:clientId', (req, res) => {
    UserController.findOneByDomainIdAndAccountIdAndClientId(req, res);
});

userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/privateusers/:privateusers', (req, res) => {
    UserController.findAllByDomainIdAndAccountId(req, res);
});

userRouter.put(uri, (req, res) => {
    UserController.create(req, res);
});

userRouter.put(uri + "/add/room/:roomId", (req, res) => {
    UserController.insertUserToRoom(req, res);
});

userRouter.post(uri, (req, res) => {
    UserController.update(req, res);
});

export = userRouter;
