import {Router} from "express";
import {MessageController} from "../controller/message-controller";

let uri = "/message";
const messageRouter: Router = Router();


messageRouter.get(uri + '/room/:room', (req, res) => {
    console.log("route find message");
    MessageController.findOne(req, res);
});

messageRouter.get(uri + '/room/:room/text/:text', (req, res) => {
    MessageController.findMessages(req, res);
});

export = messageRouter;
