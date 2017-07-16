import { Router, Request, Response } from 'express';
import {UserController} from "../controller/user-controller";
import {MessageController} from "../controller/message-controller";

let uri = "/message";
const messageRouter: Router = Router();


messageRouter.get(uri + '/name/:name', (req, res) => {
    console.log("route findClient");
    MessageController.findOne(req, res);
});

export = messageRouter;
