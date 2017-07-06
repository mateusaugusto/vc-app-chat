import {Observable} from "rxjs";
import {IUserModel} from "../interface/user/iuser-model";
import {IUser} from "../interface/user/iuser";
import {UserModel} from "../schema/user-schema";



export class User {
    name: string;
    domainId: number;
    accountId: number;
    userRooms: number[];

    constructor(user: IUserModel) {
        this.name = user.name;
        this.domainId = user.domainId;
        this.accountId = user.accountId;
        this.userRooms = user.userRooms;
    }

    public static create(user: IUser): Observable<User> {
    console.log("entrou");
    return new Observable(observer => {
        UserModel.create(user, (error, user) => {
            console.log("salvando cliente");
            if (!error && user) {
                observer.next(new User(user));
                observer.complete();
            } else {
                observer.error(new Error());
                console.log(error);
            }
        });

    });
}
    public static update(user: IUser): Observable<User> {
        return new Observable(observer => {
            console.log("update cliente");
            UserModel.update(user, (error, user) => {
                if (!error && user) {
                    observer.next(new User(user));
                    observer.complete();
                } else {
                    observer.error(new Error());
                    console.log(error);
                }
            });

        });
    }

    public static insertRoomToUser(user: IUser, roomId: number): Observable<User> {
        return new Observable(observer => {
            console.log("insert room cliente" + roomId);
            user.userRooms.push(roomId);
            UserModel.update(user, (error, user) => {
                if (!error && user) {
                    observer.next(new User(user));
                    observer.complete();
                } else {
                    observer.error(new Error());
                    console.log(error);
                }
            });

        });
    }
}

/*
{
    "name": "oi",
    "domainId": 1,
    "accountId": 5,
    "userRooms": [8,7]
}*/
