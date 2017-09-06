import {Router} from 'express';
import {UnreadMessagesController} from "../controller/unreadmessages-controller";

let uri = "/unreadmessages";
const unreadRouter: Router = Router();

unreadRouter.put(uri, (req, res) => {
    UnreadMessagesController.create(req, res);
});

unreadRouter.post(uri, (req, res) => {
    console.log("removendo");
    UnreadMessagesController.removeUserFromList(req, res);
});

export = unreadRouter;
