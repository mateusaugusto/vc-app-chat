import {BaseDomain} from "./base-domain";
import {RoomDomain} from "./room-domain";

export class UserDomain extends BaseDomain{
    clientId: number;
    room: RoomDomain[];
}