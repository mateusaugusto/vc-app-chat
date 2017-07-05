import {Observable} from "rxjs";
import * as mongoose from "mongoose";

export interface IUser {
    name: string;
}

interface IUserModel extends IUser, mongoose.Document {
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);


export class User {
    name: string;

    constructor(user: IUserModel) {
        this.name = user.name;
    }

    public static create(name: string): Observable<User> {
        console.log("entrou");
        return new Observable(observer => {
            UserModel.create({name}, (error, user) => {
                console.log("salvando cliente");
                if (!error && user) {
                    observer.next(new User(user));
                    observer.complete();
                    console.log("salvou");
                } else {
                    observer.error(new Error());
                }
            });
        });
    }
}