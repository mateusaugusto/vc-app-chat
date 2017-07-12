import { Router, Request, Response } from 'express';
import {RoomController} from "../controller/room-controller";

let uri = "/room";
const roomRouter: Router = Router();

roomRouter.get(uri + '/name/:name', (req: Request, res: Response) => {
    console.log("route");
    RoomController.find(req, res);
});

export = roomRouter;
