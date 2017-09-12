import {Observable} from 'rxjs';
import * as moment from 'moment';

import {Message} from './message.model';
import {IRoomModel} from "../interface/room/iroom-model";
import {RoomModel} from "../schema/room-schema";
import {RoomDomain} from "../domain/room-domain";

export class Room {
    name: string;
    created: string;
    domainId: number;
    accountId: number;
    _id: string;
    privateRoom: boolean;
    usersRoom: String[];
    isEnabled: boolean;

    constructor(room: IRoomModel) {
        this.name = room.name;
        this.created = moment.utc().format();
        this.domainId = room.domainId;
        this.accountId = room.accountId;
        this._id = room._id;
        this.privateRoom = room.privateRoom;
        this.usersRoom = room.usersRoom;
        this.isEnabled = room.isEnabled;
    }

    public static findOne(room: RoomDomain): Observable<Room[]> {
        return new Observable(observer => {
            RoomModel.find({_id: room._id}, (error, rooms) => {
                if (!error && rooms) {
                    observer.next(rooms.map(room => new Room(room)));
                } else {
                    observer.next([]);
                }
                observer.complete();
            });
        });
    }

    messages() {
        return Message.list(this.name);
    }
}