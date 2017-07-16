import {ReplaySubject} from 'rxjs';

import {SocketService, UserService} from '../../core';
import {IMessage} from '../../../server/src';
import {Injectable} from "@angular/core";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

@Injectable()
export class MessageService {
    messages: ReplaySubject<any> = new ReplaySubject(1);
    private list: IMessage[] = [];
    private socketService: SocketService;

    constructor(private userService: UserService, private room: RoomDomain) {
        // Connect to room nsp
        this.socketService = new SocketService('messages/' + encodeURIComponent(this.room.name));

        // Get initial items
        this.socketService.items().subscribe(message => {
                this.list.push(message);
                this.messages.next(this.list);
                console.log("message service list" + this.list);
            },
            error => console.log(error)
        );

        // Send user joined message
        this.socketService.onConnect().subscribe(
            () => this.send(`${this.userService.user.name} joined the channel`)
        );

        // Send user leave message
        this.socketService.onDisconnect().subscribe(
            () => this.send(`${this.userService.user.name} left the channel`)
        );
    }

 /*   findOne(name: string) : Observable<IMessage[]>{
        return this.http.get('http://localhost:5000/api/message/name'+ name)
            .map((response: Response) => response.json());
    }*/


    // Emit message using socket service
    send(message: string): void {
        this.socketService.create({
            room: this.room,
            created: new Date(),
            user: this.userService.user,
            to: '',
            message: message
        });
    }

    leave(): void {
        this.socketService.socket.disconnect();
    }
}