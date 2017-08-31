import {IUserModel} from "../interface/user/iuser-model";
import {RoomDomain} from "../domain/room-domain";

export class User {
    name: string;
    domainId: number;
    accountId: number;
    clientId: number;
    room: RoomDomain[];
    isEnabled: boolean;
    _id: string;

    constructor(user: IUserModel) {
        this.name = user.name;
        this.domainId = user.domainId;
        this.accountId = user.accountId;
        this.clientId = user.clientId;
        this.room = user.room;
        this.isEnabled = user.isEnabled;
        this._id = user._id;
    }
}
