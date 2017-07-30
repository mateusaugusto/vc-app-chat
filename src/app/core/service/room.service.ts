import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";
import {SocketService} from "./socket.service";
import {UserService} from "./user.service";
import {RoomDomain} from "../../../server/src/domain/room-domain";

@Injectable()
export class RoomService {
  rooms: ReplaySubject<any> = new ReplaySubject(1);
  list: RoomDomain[];

  private socketService: SocketService;

  constructor(private userService: UserService) {
    // Open room socket
    this.socketService = new SocketService('room');

  }

  // Join room
  join(name: string): void {
    const matches = this.list.filter(room => room.name === name);
    const alreadyJoined = this.userService.rooms.filter(room => room.name === name);
    if (matches[0] && !alreadyJoined[0]) {
      this.userService.rooms.push(matches[0]);
    }
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