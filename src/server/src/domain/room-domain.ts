import {BaseDomain} from "./base-domain";
import {UserDomain} from "./user-domain";

export class RoomDomain extends BaseDomain{
    privateRoom: boolean;
    usersRoom: String[];
}