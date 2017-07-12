import * as moment from "moment";
import {IRoomModel} from "../interface/room/iroom-model";

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

}