import { Component, ViewEncapsulation } from '@angular/core';

import { UserService } from './core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})

export class AppComponent {
  constructor(public userService: UserService) {}
}
