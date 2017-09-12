import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ControlComponent} from "./components/control.component";
import {RoomsComponent} from "../rooms/components/rooms.component";
import {RoomModule} from "../room/room.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SimpleNotificationsModule} from "angular2-notifications/dist";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoomModule,
    // Animations need to be imported in to your project to use the library
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    ControlComponent,
    RoomsComponent
  ],
  exports:[
    ControlComponent
  ]
})
export class ControlModule {
}
