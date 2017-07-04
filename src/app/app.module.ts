import {NgModule} from "@angular/core";
// App component
import {AppComponent} from "./app.component";
import {CoreModule} from "./core";
import {SharedModule} from "./shared";
import {RoomsComponent} from "./rooms";
import {ControlModule} from "./control/control.module";
import {HeaderModule} from "./header/header.module";
import {NicknameModule} from "./nickname/nickname.module";
import {RoomModule} from "./room/room.module";
import {RouterModule} from "@angular/router";
import {RoomComponent} from "./room/components/room.component";
import {ControlComponent} from "./control/components/control.component";

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    ControlModule,
    HeaderModule,
    NicknameModule,
    RoomModule,
    RouterModule.forRoot([
      {path: 'room', component: ControlComponent}
    ]),
  ],
  declarations: [
    AppComponent,
    RoomsComponent
  ],
  exports: [
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
