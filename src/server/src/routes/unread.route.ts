import {Router} from 'express';
import {UnreadController} from "../controller/unread-controller";

let uri = "/unreadmessages";
const unreadRouter: Router = Router();

unreadRouter.put(uri, (req, res) => {
    UnreadController.create(req, res);
});

unreadRouter.post(uri, (req, res) => {
    console.log("removendo");
    UnreadController.removeUserFromList(req, res);
});

unreadRouter.get(uri + "/room/:roomId/user/:userId", (req, res) => {
    console.log("contando");
    UnreadController.contByRoomAdnUser(req, res);
});

export = unreadRouter;
