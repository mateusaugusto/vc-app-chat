import {UserDomain} from "../domain/user-domain";
import {IUnreadModel} from "../interface/unread/iunread-model";
import {UnreadModel} from "../schema/unread-schema";
import {Observable} from "rxjs/Observable";
import {RoomDomain} from "../domain/room-domain";

export class Unread {
    user: UserDomain[];
    room: RoomDomain;
    _id: string;

    constructor(unread: IUnreadModel) {
        this._id = unread._id;
        this.user = unread.user;
        this.room = unread.room;
    }

    public static list(room: string): Observable<IUnreadModel[]> {
        return new Observable(observer => {
            UnreadModel.find({room}, (error, messages) => {
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
