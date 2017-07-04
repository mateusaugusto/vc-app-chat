import { Component } from '@angular/core';

import { UserService } from '../../core';
import { IRoom } from '../../../models';

@Component({
  selector: 'rooms',
  templateUrl: '../views/rooms.component.html'
})

export class RoomsComponent {
  constructor(public userService: UserService) {}
}
