import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {RoomService} from "./service/room.service";
import {UserService} from "./service/user.service";

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    RoomService,
    UserService
  ]
})
export class CoreModule {}
