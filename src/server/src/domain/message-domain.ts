import {RoomDomain} from "./room-domain";
import {UserDomain} from "./user-domain";

export class MessageDomain {
    room: RoomDomain;
    created: string;
    user: UserDomain;
    to: string;
    message: string;
    _id: string;
}