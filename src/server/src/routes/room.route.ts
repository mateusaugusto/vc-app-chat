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

roomRouter.get(uri + '/domainId/:domainId/accountId/:accountId/userId/:userId/all/private', (req: Request, res: Response) => {
    console.log("find all ###########");
    RoomController.findAllPrivateRoom(req, res);
});

roomRouter.put(uri, (req, res) => {
    console.log("criando sala");
    RoomController.create(req, res);
});

roomRouter.post(uri, (req, res) => {
    console.log("update sala");
    RoomController.update(req, res);
});

roomRouter.post(uri + '/user/add/private/userRoom/:userRoom/user/:user', (req, res) => {
    console.log("add private toom");
    RoomController.insertUserToPrivateRoom(req, res);
});

export = roomRouter;
