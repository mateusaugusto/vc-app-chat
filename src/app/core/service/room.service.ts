import { ReplaySubject } from 'rxjs';
import { SocketService } from './socket.service';
import { UserService } from './user.service';
import {IRoom} from "../../../server/src/interface/room/iroom";
import {BaseUrl} from "../../infra/base-url";
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {RoomsService} from "../../rooms/service/rooms.service";

@Injectable()
export class RoomService extends BaseUrl {
  rooms: any;
  private list: IRoom[] = [];
  private socketService: SocketService;


  constructor(private userService: UserService,
              private http: Http) {
    super();
    // Open room socket
    this.socketService = new SocketService('room');


    // Subscribe to room list updates
  /*  this.socketService.items().subscribe(
      rooms => {
        this.list = rooms;
        this.rooms.next(this.list);
      },
      error => console.log(error)
    );*/


    // Get initial list
    //this.socketService.list();

  }

  // Join room
  join(name: string): void {
    const matches = this.list.filter(room => room.name === name);
    const alreadyJoined = this.userService.rooms.filter(room => room.name === name);
    if (matches[0] && !alreadyJoined[0]) {
      this.userService.rooms.push(matches[0]);
    }
  }

  // Get all posts from the API
  listbyUser(name: string) : Observable<any>{
    return this.http.get(this.getBaseUrl() + 'name/'+ name)
        .map((response: Response) => response.json());
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