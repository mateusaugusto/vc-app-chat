import {Observable} from 'rxjs';
import * as moment from 'moment';

import {Message} from './message.model';
import {IRoomModel} from "../interface/room/IRoomModel";
import {IRoom} from "../interface/room/IRoom";
import {RoomModel} from "../schema/roomSchema";

export class Room {
    name: string;
    created: Date;
    domainId: Number;
    accountId: Number;


    constructor(room: IRoomModel) {
        this.name = room.name;
        this.created = moment(room.created).toDate();
        this.domainId = room.domainId;
        this.accountId = room.accountId;
    }

    public static find(name: string): Observable<Room> {
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
        return Message.list(this.name);
    }
}