import { Router, Request, Response } from 'express';
import {UserController} from "../controller/user-controller";

let uri = "/user";
const userRouter: Router = Router();

let fullUri = '/domainId/:domainId/accountId/:accountId/clientId/:clientId'

userRouter.get(uri + fullUri, (req, res) => {
    UserController.findOneByDomainIdAndAccountIdAndClientId(req, res);
});

userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/privateusers/:privateusers', (req, res) => {
    UserController.findAllByDomainIdAndAccountId(req, res);
});

userRouter.get(uri + '/domainId/:domainId/accountId/:accountId/roomId/:roomId', (req, res) => {
    UserController.findAllUsersInRoom(req, res);
});

userRouter.put(uri + fullUri + "/name/:name", (req, res) => {
    UserController.create(req, res);
});

userRouter.put(uri + fullUri + "/add/room/:roomId", (req, res) => {
    UserController.insertUserToRoom(req, res);
});

userRouter.post(uri, (req, res) => {
    UserController.update(req, res);
});

export = userRouter;
