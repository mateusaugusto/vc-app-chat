import {IUserModel} from "../interface/user/iuser-model";

export class User {
    name: string;
    domainId: number;
    accountId: number;
    clientId: number;
    userRooms: number[];

    constructor(user: IUserModel) {
        this.name = user.name;
        this.domainId = user.domainId;
        this.accountId = user.accountId;
        this.clientId = user.clientId;
        this.userRooms = user.userRooms;
    }
}

/*
 {
 "name": "oi",
 "domainId": 1,
 "accountId": 5,
 "userRooms": [8,7]
 }*/
