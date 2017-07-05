import {Observable} from "rxjs";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export interface IUser {
    name: string;
    domainId: number;
    accountId: number;
    userRooms: number[],
}

interface IUserModel extends IUser, mongoose.Document {
}

const UserSchema = new mongoose.Schema({
    name: {type: String },
    domainId: { type: Number, unique: true },
    accountId: { type: Number, unique: true },
    userRooms: [{ type: Number, ref: 'Room' }]
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);


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
                    console.log(error.stack);
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
