import {Observable} from "rxjs";
import * as moment from "moment";
import {IMessageModel} from "../interface/message/imessage-model";
import {IMessage} from "../interface/message/imessage";
import {MessageModel} from "../schema/message-schema";
import {UserDomain} from "../domain/user-domain";
import {RoomDomain} from "../domain/room-domain";

export class Message {
    room: RoomDomain;
    created: string;
    user: UserDomain;
    to: string;
    message: string;

    constructor(message: IMessageModel) {
        this.room = message.room;
        this.user = message.user;
        this.created = moment.utc().format();
        this.user = message.user;
        this.to = message.to;
        this.message = message.message;
    }

    public static create(message: IMessage): Observable<Message> {
        return new Observable(observer => {
            message.created = moment.utc().format();
            console.log("criando msg:" + message);
            MessageModel.create(message, (error, message) => {
                if (!error && message) {
                    observer.next(new Message(message));
                }
                observer.complete();
            });
        });
    }

    public static findOne(message: IMessage): Observable<Message> {
        return new Observable(observer => {
            console.log("finding:" + message);
            MessageModel.findOne(message, (error, message) => {
                if (!error && message) {
                    observer.next(new Message(message));
                }
                observer.complete();
            }).populate("user");
        });
    }

    public static list(room: string): Observable<Message[]> {
        return new Observable(observer => {
            MessageModel.find({room}, (error, messages) => {
                if (!error && messages) {
                    observer.next(messages.map(message => new Message(message)));
                } else {
                    observer.next([]);
                }
                observer.complete();
            }).populate("User");
        });
    }

    public static remove(room: string): Observable<Message[]> {
        return new Observable(observer => {
            MessageModel.remove({room}, (error) => {
                if (!error) {
                    observer.complete();
                } else {
                    observer.error(new Error(error));
                }
            });
        });
    }
}