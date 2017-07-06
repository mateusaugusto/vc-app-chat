import { Injectable } from '@angular/core';

import { IRoom } from '../../../models';
import {SocketService} from "./socket.service";

@Injectable()
export class UserService {
  nickname: string = 'mateus';
  rooms: IRoom[] = [];

  private socketService: SocketService;

  constructor() {
    // Open room socket
    this.socketService = new SocketService('user');

    // Get initial list
    this.socketService.list();
  }

  // Create User
  create(name: string) {
    this.socketService.create(name);
  }

}