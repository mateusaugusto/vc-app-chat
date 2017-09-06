import {UserDomain} from "../domain/user-domain";
import {MessageDomain} from "../domain/message-domain";
import {IUnreadMessageModel} from "../interface/unreadmessages/iunreadmessages-model";
import {UnreadMessagesModel} from "../schema/unreadmessages-schema";
import {Observable} from "rxjs/Observable";
import {RoomDomain} from "../domain/room-domain";

export class UnreadMessages {
    user: UserDomain[];
    room: RoomDomain;
    _id: string;

    constructor(unreadMessage: IUnreadMessageModel) {
        this._id = unreadMessage._id;
        this.user = unreadMessage.user;
        this.room = unreadMessage.room;
    }

    public static list(room: string): Observable<IUnreadMessageModel[]> {
        return new Observable(observer => {
            UnreadMessagesModel.find({room}, (error, messages) => {
                if (!error && messages) {
                    observer.next(messages.map(message => ""));
                } else {
                    observer.next([]);
                }
                observer.complete();
            }).populate("User");
        });
    }
}
