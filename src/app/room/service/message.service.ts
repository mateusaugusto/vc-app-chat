import { ReplaySubject } from 'rxjs';

import { SocketService, UserService } from '../../core';
import { IMessage } from '../../../server/src';
import {Injectable} from "@angular/core";

@Injectable()
export class MessageService {
  messages: ReplaySubject<any> = new ReplaySubject(1);
  private list: IMessage[] = [];
  private socketService: SocketService;

  constructor(private userService: UserService, private room: string) {

    // Connect to room nsp
    this.socketService = new SocketService('messages/' + encodeURIComponent(this.room));

    // Get initial items
    this.socketService.items().subscribe(message => {
          this.list.push(message);
          this.messages.next(this.list);
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

  // Emit message using socket service
  send(message: string): void {
    this.socketService.create({
      room: this.room,
      created: new Date(),
      from: this.userService.user.name,
      to: '',
      message: message
    });
  }

  leave(): void {
    this.socketService.socket.disconnect();
  }
}