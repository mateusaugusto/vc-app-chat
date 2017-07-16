import {Observable} from 'rxjs';
import * as moment from 'moment';

import {Message} from './message.model';
import {IRoomModel} from "../interface/room/iroom-model";
import {IRoom} from "../interface/room/iroom";
import {RoomModel} from "../schema/room-schema";
import {RoomDomain} from "../domain/room-domain";

export class Room {
    name: string;
    created: Date;
    domainId: number;
    accountId: number;


    constructor(room: IRoomModel) {
        this.name = room.name;
        this.created = moment(room.created).toDate();
        this.domainId = room.domainId;
        this.accountId = room.accountId;
    }

    public static find(room: RoomDomain): Observable<Room> {
        return new Observable(observer => {
            console.log("find room:" + room);
            RoomModel.findOne({room}, (error, room) => {
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
        return Message.list(this.name);
    }
}