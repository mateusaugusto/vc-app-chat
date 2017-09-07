import {Router} from 'express';
import {UnreadController} from "../controller/unreadmessage-controller";

let uri = "/unreadmessages";
const unreadRouter: Router = Router();

unreadRouter.put(uri, (req, res) => {
    UnreadController.create(req, res);
});

unreadRouter.post(uri, (req, res) => {
    console.log("removendo");
    UnreadController.removeUserFromList(req, res);
});

unreadRouter.get(uri + "/room/:room/user/:user", (req, res) => {
    console.log("deletando");
    UnreadController.removeUserFromList(req, res);
});

export = unreadRouter;
