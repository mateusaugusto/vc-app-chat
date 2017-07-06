import { Component } from '@angular/core';

import { RoomService } from '../../core';
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'control',
  templateUrl: '../views/control.component.html'
})
export class ControlComponent {
  room: string = '';
  newRoom: string = '';

  constructor(public roomService: RoomService) {
  }

  // Join room, when Join-button is pressed
  join(room): void {
    this.roomService.join(room);
    this.room = '';
  }

  // Create room, when Create-button is pressed and empty newRoom text input
  create(): void {
    this.roomService.create(this.newRoom);
    this.newRoom = '';
  }

  // Remove room, when Remove-button is pressed and unset selected room
  remove(): void {
    this.roomService.remove(this.room);
    this.room = '';
  }

  // Handle keypress event (for creating a new room)
  eventHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.create();
    }
  }
}
