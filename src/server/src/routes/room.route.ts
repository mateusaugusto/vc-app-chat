import express = require("express");
import {Room} from "../model/room.model";
import {IRoom} from "../interface/room/iroom";


let roomRouter = express.Router();

let uri = "/room"

roomRouter.get(uri, function (req, res) {
    console.log("room");
});


roomRouter.post(uri, (req, res) => {
    var room: IRoom = <IRoom>req.body;
    Room.create(room).subscribe(
        room => {
            res.send(room);
        },
        error => console.log(error)
    );

});

export = roomRouter;
