import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";
import express = require("express");
import {RoomModel} from "../schema/room-schema";
import {IRoom} from "../index";

export class RoomController {

    public static find(req: express.Request, res: express.Response): void {
        var name = req.params.name;
        console.log("route" + name);

        RoomModel.find({name}, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                res.send(result);
                console.log("result" + result);
            }
        });
    };

    public static create(req: express.Request, res: express.Response): void {
        var room: IRoom = <IRoom>req.body;
        RoomModel.create(room, (error, result) => {
            if (error) res.send({"error": "error"});
            else {
                res.send(result);
            }
        });
    }

/*    public static find(name: string): Observable<Room> {
        return new Observable(observer => {
            RoomModel.findOne({name}, (error, room) => {
                if (!error && room) {
                    observer.next(new Room(room));
                }
                observer.complete();
            });
        });
    }

    public static create(room: IRoom): Observable<any> {
        return new Observable(observer => {
            room.created = new Date();
            RoomModel.create(room, (error, room) => {
                if (!error && room) {
                    observer.next(new Room(room));
                    observer.complete();
                } else {
                    observer.error(new Error());
                }
            });
        })
    }

    public static list(): Observable<Room[]> {
        return new Observable(observer => {
            RoomModel.find({}, (error, rooms) => {
                if (!error && rooms) {
                    observer.next(rooms.map(room => new Room(room)));
                } else {
                    observer.next([]);
                }
                observer.complete();
            });
        });
    }

    remove(): Observable<any> {
        return new Observable(observer => {
            RoomModel.remove({name: this.name}).exec();
            Message.remove(this.name).subscribe(
                x => {
                },
                error => observer.error(new Error(error)),
                () => observer.complete()
            );
        });
    }

    messages() {
        console.log("chamou listar");
        return Message.list(this.name);
    }*/

}