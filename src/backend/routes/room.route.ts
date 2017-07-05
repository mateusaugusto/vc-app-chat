import express = require("express");
import {IRoom, Room} from "../../models/room.model";
let roomRouter = express.Router();

let uri = "/room"

roomRouter.get(uri, function (req, res) {
    console.log("room");
});


roomRouter.post(uri, (req, res) => {
    var room: IRoom = <IRoom>req.body;
    console.log('Room creation ' + room.name);
    Room.create(room).subscribe(
        room => {
            res.send(room);
        },
        error => res.send(500)
    );

});

export = roomRouter;
