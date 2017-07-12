import {NgModule} from "@angular/core";
// App component
import {AppComponent} from "./app.component";
import {CoreModule} from "./core";
import {SharedModule} from "./shared";
import {RoomsComponent} from "./rooms";
import {ControlModule} from "./control/control.module";
import {RoomModule} from "./room/room.module";
import {RouterModule} from "@angular/router";
import {ControlComponent} from "./control/components/control.component";
import {HttpModule} from "@angular/http";
import {RoomsModule} from "./rooms/rooms.module";

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    ControlModule,
    HttpModule,
    RoomModule,
    RoomsModule,
    RouterModule.forRoot([
      {path: 'user/:clienteId', component: ControlComponent}
    ]),
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
