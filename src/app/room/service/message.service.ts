import {ReplaySubject} from 'rxjs';

import {SocketService, UserService} from '../../core';
import {IMessage} from '../../../server/src';
import {Injectable} from "@angular/core";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {BaseUrl} from "../../infra/base-url";
import {SecureHttpService} from "../../oauth2/service/secure-httpservice";

@Injectable()
export class MessageService extends BaseUrl {
    messages: ReplaySubject<any> = new ReplaySubject(1);
    env: ReplaySubject<any> = new ReplaySubject(1);

    private socketService: SocketService;
    private socketServiceControl: SocketService;

    constructor(private userService: UserService,
                private room: RoomDomain,
                private http: Http,
                private secureHttpService: SecureHttpService) {
        super();

        this.socketServiceControl = new SocketService('control');

        this.socketService = new SocketService('messages/' + encodeURIComponent(this.room.name));

        // Escuta as mesnagens no socket e envia para messagens variavel
        this.socketService.items().subscribe(message => {
                this.messages.next(message);
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

    findOne(room: string): Observable<IMessage[]> {
        return this.http.get(this.getBaseUrl() + `message/room/${room}`, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    findMessages(room: string, text: string): Observable<IMessage[]> {
        return this.http.get(this.getBaseUrl() + `message/room/${room}/text/${text}`, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }


    // Emit message using socket service
    send(message: string): void {
        this.socketService.create({
            room: this.room,
            created: new Date(),
            user: this.userService.user,
            to:  this.room.privateRoom ? this.room.nickName: '',
            message: message
        });
    }

    sendControl(params: any) : void {
        //this.socketServiceControl.set();
        this.socketServiceControl.set({
            room: this.room,
            user: this.userService.user,
            unread: params
        });
    }

    leave(): void {
        this.socketService.socket.disconnect();
    }
}