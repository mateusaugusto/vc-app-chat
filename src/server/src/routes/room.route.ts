import {Router, Request, Response} from 'express';
import {RoomController} from "../controller/room-controller";

let uri = "/room";
const roomRouter: Router = Router();

roomRouter.get(uri + '/name/:name', (req: Request, res: Response) => {
    console.log("listando");
    RoomController.find(req, res);
});

roomRouter.get(uri + '/domainId/:domainId/accountId/:accountId/userRoom/:userRoom/user/:user', (req: Request, res: Response) => {
    RoomController.findPrivateRoom(req, res);
});

roomRouter.post(uri, (req, res) => {
    console.log("criando sala");
    RoomController.create(req, res);
});

export = roomRouter;
