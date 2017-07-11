import { Component } from '@angular/core';

import { RoomService } from '../../core';
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../server/src/model/user.model";
import {UserDomain} from "../../../server/src/domain/user-domain";

@Component({
  selector: 'control',
  templateUrl: '../views/control.component.html'
})
export class ControlComponent {
  room: string = '';
  newRoom: string = '';
  clientId: number;
  teste: UserDomain;

  constructor(public roomService: RoomService,
              private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.clientId = +this.route.snapshot.params['clienteId'];

    this.userService.findOne(this.clientId).subscribe(user => {
      this.teste = user;
    });

    console.log("ress  / " + this.teste);
    //this.userService.nickname = "luis";
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
