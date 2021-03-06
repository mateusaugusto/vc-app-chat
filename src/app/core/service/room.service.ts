import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";
import {SocketService} from "./socket.service";
import {UserService} from "./user.service";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {Observable} from "rxjs/Observable";
import {BaseUrl} from "../../infra/base-url";
import {Http, Response} from "@angular/http";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {SecureHttpService} from "../../oauth2/service/secure-httpservice";

@Injectable()
export class RoomService extends BaseUrl {
    rooms: ReplaySubject<any> = new ReplaySubject(1);
    list: RoomDomain[] = [];
    privateList: RoomDomain[] = [];

    private socketService: SocketService;

    constructor(private userService: UserService,
                private http: Http,
                private secureHttpService: SecureHttpService) {
        super();
        // Open room socket
        this.socketService = new SocketService('room');

    }

    isConected(params: any): boolean{
        return this.socketService.isConected(params);
    }


    addRoomToSocket(room: RoomDomain): Observable<any> {
        return new Observable(observer => {
            this.socketService.findOne(room);
        });
    }

    // Get all posts from the API
    findPrivateRoom(idUserRoom: String, user: UserDomain): Observable<RoomDomain> {
        return this.http.get(this.getBaseUrl() + `room/domainId/${user.domainId}/accountId/${user.accountId}/userRoom/${idUserRoom}/user/${user['_id']}`, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    create(room: RoomDomain): Observable<RoomDomain> {
        return this.http.put(this.getBaseUrl() + `room/domainId/${room.domainId}/accountId/${room.accountId}/name/${room.name}/`, room, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    addUserToPrivateRoom(room: RoomDomain, user: String, userRoom: String): Observable<RoomDomain> {
        return this.http.post(this.getBaseUrl() + `room/user/add/private/userRoom/${userRoom}/user/${user}`, room, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json())
    }

    // Get all posts from the API
    findAllPrivateRoom(user: UserDomain): Observable<RoomDomain[]> {
        return this.http.get(this.getBaseUrl() + `room/domainId/${user.domainId}/accountId/${user.accountId}/userId/${user['_id']}/all/private`, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    // Join room
    join(room: RoomDomain): void {
        //const matches = this.list.filter(r => r.name === room.name);
        if (this.userService.rooms.length > 0) {
            this.leave(this.userService.rooms[0].name);
        }
        const alreadyJoined = this.userService.rooms.filter(r => r.name === room.name);
        if (!alreadyJoined[0]) {
            this.userService.rooms.push(room);
        }
    }

    // Leave room
    leave(name: string) {
        this.userService.rooms = this.userService.rooms.filter(room => room.name !== name);
    }

    // Remove room
    remove(name: string) {
        // Leave room
        this.leave(name);
        // Send signal to remove the room
        this.socketService.remove(name);
    }
}