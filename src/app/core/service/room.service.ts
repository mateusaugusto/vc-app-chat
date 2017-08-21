import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";
import {SocketService} from "./socket.service";
import {UserService} from "./user.service";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {Observable} from "rxjs/Observable";
import {BaseUrl} from "../../infra/base-url";
import {Http, Response} from "@angular/http";
import {UserDomain} from "../../../server/src/domain/user-domain";

@Injectable()
export class RoomService extends BaseUrl {
  rooms: ReplaySubject<any> = new ReplaySubject(1);
  list: RoomDomain[];
  privateList: RoomDomain[];

  private socketService: SocketService;

  constructor(private userService: UserService,
              private http: Http) {
    super();
    // Open room socket
    this.socketService = new SocketService('room');

  }

  // Get all posts from the API
  findPrivateRoom(idUserRoom: String, user: UserDomain) : Observable<RoomDomain>{
    return this.http.get(this.getBaseUrl() + `room/domainId/${user.domainId}/accountId/${user.accountId}/userRoom/${idUserRoom}/user/${user['_id']}`)
        .map((response: Response) => response.json());
  }

  // Join room
  join(name: string): void {
    const matches = this.list.filter(room => room.name === name);
    const alreadyJoined = this.userService.rooms.filter(room => room.name === name);
    if (matches[0] && !alreadyJoined[0]) {
      this.userService.rooms.push(matches[0]);
    }
  }

  joinPrivate(room: RoomDomain): void {
      this.userService.rooms.push(room[0]);
  }

  // Leave room
  leave(name: string) {
    this.userService.rooms = this.userService.rooms.filter(room => room.name !== name);
  }

  // Create room
  create(name: string) {
    this.socketService.create(name);
  }

  // Remove room
  remove(name: string) {
    // Leave room
    this.leave(name);
    // Send signal to remove the room
    this.socketService.remove(name);
  }
}