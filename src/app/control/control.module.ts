import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ControlComponent} from "./components/control.component";
import {RoomsComponent} from "../rooms/components/rooms.component";
import {RoomModule} from "../room/room.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoomModule
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
