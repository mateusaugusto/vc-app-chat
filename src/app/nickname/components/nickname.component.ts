import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from '../../core';

@Component({
  selector: 'nickname',
  templateUrl: '../views/nickname.component.html'
})

export class NicknameComponent implements AfterViewInit {
  @ViewChild('focus') private focus: ElementRef;
  nickname: string;

  constructor(public userService: UserService) {
    this.nickname = userService.nickname;

  }

  // After view initialised, focus on nickname text input
  ngAfterViewInit(): void {
    this.focus.nativeElement.focus();
  }

  // Save nickname to user store
  save(): void {
    this.userService.nickname = this.nickname;
    this.userService.create(this.nickname);
  }

  // Handle keypress event, for saving nickname
  eventHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
     // this.save();
    }
  }
}
