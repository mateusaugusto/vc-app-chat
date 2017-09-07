import {BaseDomain} from "./base-domain";

export class RoomDomain extends BaseDomain{
    privateRoom: boolean;
    usersRoom: String[];
    nickName: String;
    isUnread: boolean = false;
    countMessage: number = 0;
}