import {UserDomain} from "./user-domain";
import {MessageDomain} from "./message-domain";
import {RoomDomain} from "./room-domain";

export class UnreadMessagesDomain{
    room: RoomDomain;
    user = [];
}