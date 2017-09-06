import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {RoomService} from "./service/room.service";
import {UserService} from "./service/user.service";
import {UnreadMessagesService} from "./service/unreadmessages.service";

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    RoomService,
    UserService,
    UnreadMessagesService
  ]
})
export class CoreModule {}
