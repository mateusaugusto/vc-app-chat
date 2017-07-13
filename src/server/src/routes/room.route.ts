import {Router, Request, Response} from 'express';
import {RoomController} from "../controller/room-controller";

let uri = "/room";
const roomRouter: Router = Router();

roomRouter.get(uri + '/name/:name', (req: Request, res: Response) => {
    console.log("listando");
    RoomController.find(req, res);
});

roomRouter.post(uri, (req, res) => {
    console.log("criando");
    RoomController.create(req, res);
});

export = roomRouter;
