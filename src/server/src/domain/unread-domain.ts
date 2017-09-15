import {RoomDomain} from "./room-domain";

export class UnreadMessagesDomain{
    room: RoomDomain;
    user = [];
    message: String;
}