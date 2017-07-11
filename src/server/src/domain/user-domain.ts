import {BaseDomain} from "./base-domain";

export class UserDomain extends BaseDomain{
    clientId: number;
    userRooms: number[];
}